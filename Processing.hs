{-# LANGUAGE OverloadedStrings, ScopedTypeVariables #-}

module Processing where

import Control.Applicative
import Control.Monad
import Control.Monad.Trans
import Control.Exception
import Data.List(intercalate)
import Data.Foldable(foldMap)
import Data.Monoid

import qualified Data.Map as Map
import qualified Data.Set as Set
import qualified Data.Text as T
import qualified Text.Parsec as P

import qualified ParserP as P

import AST
import EIO

type SModule = Module ScopedName
type SModuleMap = Map.Map ModuleName SModule

loadModule :: FilePath -> (ModuleName -> [FilePath]) -> SModuleMap -> EIO P.ParseError (SModule,SModuleMap)
loadModule fpath findm mm = do
    m0 <- eioFromEither $ P.fromFile P.moduleFile fpath
    mm' <- addDeps m0 mm
    return (m0,mm')

  where
    addDeps :: SModule -> SModuleMap -> EIO P.ParseError SModuleMap
    addDeps m mm = do
       liftIO $ print (getReferencedModules m)
       foldM addDep mm (Set.toList (getReferencedModules m))

    addDep :: SModuleMap -> ModuleName -> EIO P.ParseError SModuleMap
    addDep mm mname = case Map.member mname mm of
        True -> return mm
        False -> do
          m <- findModule mname (findm mname)
          let mm' = Map.insert mname m mm
          addDeps m mm'

    findModule :: ModuleName -> [FilePath] -> EIO P.ParseError SModule
    findModule mname [] = liftIO $ ioError $ userError $ "Unable to find module '" ++ T.unpack (moduleName mname) ++ "'"
    findModule mname (fpath:fpaths) = do
        em <-  liftIO $ try (P.fromFile P.moduleFile fpath)
        case em of
            (Left (ioe::IOError)) -> findModule mname fpaths
            (Right em) -> eioFromEither (return em)

type ErrorLog = [T.Text]

data Duplicate = D_StructField Ident Ident
               | D_StructParam Ident Ident
               | D_UnionField Ident Ident
               | D_UnionParam Ident Ident
               | D_Decl Ident

checkDuplicates :: Module t -> ErrorLog
checkDuplicates m = declErrors ++ structErrors ++ unionErrors
  where
    declErrors = map dupMessage1 $ findDuplicates [ d_name d | d <- Map.elems (m_decls m) ]
    structErrors = concat [ structErrors1 n s | Decl{d_name=n,d_type=Decl_Struct s} <- Map.elems (m_decls m) ]
    unionErrors = concat [ unionErrors1 n u | Decl{d_name=n,d_type=Decl_Union u} <- Map.elems (m_decls m) ]

    structErrors1 n s = (map (dupMessage2 "struct" "field" n) . findDuplicates) [ f_name f | f <- s_fields s ] ++
                        (map (dupMessage2 "struct" "type param" n) . findDuplicates) [t | t <- s_typeParams s ]

    unionErrors1 n u = (map (dupMessage2 "union" "field" n) . findDuplicates) [ f_name f | f <- u_fields u ] ++
                       (map (dupMessage2 "union" "type param" n) . findDuplicates) [t | t <- u_typeParams u ]

    dupMessage2 s1 s2 n i = T.concat [ mname (m_name m), ", in ", s1, " ", n, " duplicate ", s2, " ", i ]
    dupMessage1 i = T.concat [ mname (m_name m), ", duplicate definition of ", i ]
      
    mname :: ModuleName -> T.Text
    mname m = "In module " `T.append` moduleName m

    findDuplicates :: (Ord a) => [a] -> [a]
    findDuplicates as = [ a | (a,n) <- Map.toList (foldr (\a -> Map.insertWith' (+) a 1) Map.empty as),
                          n > 1 ]

moduleName :: ModuleName -> T.Text
moduleName m = T.intercalate "." m

data ResolvedType = RT_Named (ScopedName,Decl ResolvedType)
                  | RT_Param Ident

type RModule = Module ResolvedType
type RModuleMap = Map.Map ModuleName RModule

type TMap = Map.Map ScopedName ResolvedType

-- Naming Scope
    -- Decls in referenced modules (imported and explicitly referenced)
    -- Decls in current modules
    -- Type params for the current object

data NameScope = NameScope {
    ns_globals :: Map.Map ScopedName (Decl ResolvedType),
    ns_locals :: Map.Map Ident (Decl ResolvedType),
    ns_currentModule :: Map.Map Ident (Decl ScopedName),
    ns_typeParams :: Set.Set Ident
}

data LookupResult = LR_Defined (Decl ResolvedType)
                  | LR_New (Decl ScopedName)
                  | LR_TypeVar
                  | LR_NotFound

nlookup :: NameScope -> ScopedName -> LookupResult
nlookup ns sn | sn_moduleName sn == [] = global sn
              | otherwise = local (sn_name sn)
  where
    global sn = case Map.lookup sn (ns_globals ns) of
        (Just decl) -> LR_Defined decl
        Nothing -> LR_NotFound

    local ident = case Map.lookup ident (ns_currentModule ns) of
        (Just decl) -> LR_New decl
        Nothing -> case Map.lookup ident (ns_locals ns) of
            (Just decl) -> LR_Defined decl
            Nothing -> if Set.member ident (ns_typeParams ns) then LR_TypeVar else LR_NotFound
             
type UndefinedNames = [ScopedName]

undefinedNames :: Module ScopedName -> NameScope -> UndefinedNames
undefinedNames m ns = foldMap checkDecl (m_decls m)
    where
      checkDecl :: (Decl ScopedName) -> UndefinedNames
      checkDecl Decl{d_type=Decl_Struct s} = checkFields (withTypeParams (s_typeParams s)) (s_fields s)
      checkDecl Decl{d_type=Decl_Union u} = checkFields  (withTypeParams (u_typeParams u)) (u_fields u)
      checkDecl Decl{d_type=Decl_Typedef t} = checkTypeExpr (withTypeParams (t_typeParams t)) (t_typeExpr t)

      withTypeParams :: [Ident] -> NameScope
      withTypeParams ids = ns{ns_typeParams=Set.fromList ids}

      checkFields :: NameScope -> [Field ScopedName] -> UndefinedNames
      checkFields ns fs = foldMap (checkTypeExpr ns.f_type) fs

      checkTypeExpr :: NameScope -> TypeExpr ScopedName -> UndefinedNames
      checkTypeExpr ns (TE_Ref sn) = checkScopedName ns sn
      checkTypeExpr ns (TE_Apply t args) = checkScopedName ns t `mappend` foldMap (checkTypeExpr ns) args

      checkScopedName :: NameScope -> ScopedName -> UndefinedNames
      checkScopedName ns sn = case nlookup ns sn of
          LR_NotFound -> [sn]
          _ -> []

-- Resolve all type references in a module. This assumes that all types
-- are resolvable, ie there are no undefined Types
resolveModule :: Module ScopedName -> NameScope -> Module ResolvedType
resolveModule m ns = m{m_decls=Map.map (resolveDecl ns') (m_decls m)}
  where
    ns' = ns{ns_currentModule=m_decls m}

    resolveDecl :: NameScope -> Decl ScopedName -> Decl ResolvedType

    resolveDecl ns d@Decl{d_type=Decl_Struct s} = d{d_type=Decl_Struct (s{s_fields=fields'})}
      where
        fields' = resolveFields (withTypeParams ns (s_typeParams s)) (s_fields s)

    resolveDecl ns d@Decl{d_type=Decl_Union u} = d{d_type=Decl_Union (u{u_fields=fields'})}
      where
        fields' = resolveFields (withTypeParams ns (u_typeParams u)) (u_fields u)
                                                
    resolveDecl ns d@Decl{d_type=Decl_Typedef t} = d{d_type=Decl_Typedef (t{t_typeExpr=expr'})}
      where
        expr' = resolveTypeExpr (withTypeParams ns (t_typeParams t)) (t_typeExpr t)

    resolveFields :: NameScope -> [Field ScopedName] -> [Field ResolvedType]
    resolveFields ns fields = [f{f_type=resolveTypeExpr ns (f_type f)} | f <- fields]

    resolveTypeExpr :: NameScope -> TypeExpr ScopedName -> TypeExpr ResolvedType
    resolveTypeExpr ns (TE_Ref sn) = TE_Ref (resolveName ns sn)
    resolveTypeExpr ns (TE_Apply t args) = TE_Apply (resolveName ns t) (map (resolveTypeExpr ns) args)

    resolveName :: NameScope -> ScopedName -> ResolvedType
    resolveName ns sn = case nlookup ns sn of
        LR_Defined decl -> RT_Named (sn,decl)
        LR_New decl -> let decl1 = resolveDecl ns1 decl
                           ns1 = ns{ns_locals=Map.insert (sn_name sn) decl1 (ns_locals ns)}
                       in RT_Named (sn,decl1)
        LR_TypeVar -> RT_Param (sn_name sn)
        LR_NotFound -> error ("PRECONDITION FAIL: unable to resolve type for " ++ show sn)

    withTypeParams :: NameScope -> [Ident] -> NameScope
    withTypeParams ns ids = ns{ns_typeParams=Set.fromList ids}
