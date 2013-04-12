{-# LANGUAGE ScopedTypeVariables, OverloadedStrings #-}
module Main where

import System.Environment (getArgs)
import Control.Concurrent.STM

import qualified Data.Map as Map
import qualified Data.Text as T
import qualified Data.Text.IO as T
import qualified System.Log.Logger as L

import qualified ADL.Core.Comms as AC
import qualified ADL.Core.Comms.Rpc as AC
import qualified ADL.Core.Comms.HTTP as AC

import ADL.Utils.Resource
import ADL.Core.Value
import ADL.Core.Sink

import ADL.Examples.Kvstore1

import Utils

type MapV = TVar (Map.Map T.Text T.Text)

kvServer rfile = do
    withResource AC.newContext $ \ctx -> do
    withResource (AC.newEndPoint ctx (Left 2001)) $ \ep -> do
      mapv <- atomically $ newTVar Map.empty
      ls <- AC.newLocalSink ep (Just "kvstore") (processRequest mapv ctx)
      aToJSONFile defaultJSONFlags rfile (AC.toSink ls)
      putStrLn ("Wrote kv server reference to " ++ show rfile)
      threadWait
    
processRequest :: MapV -> AC.Context -> KVRequest -> IO ()
processRequest mapv ctx req = case req of
  (KVRequest_put rpc) -> AC.handleRPC ctx rpc put
  (KVRequest_delete rpc) -> AC.handleRPC ctx rpc delete
  (KVRequest_query rpc) -> AC.handleRPC ctx rpc query
  where
    put :: KVPair -> IO ()
    put (key,value) = atomically $ modifyTVar mapv $ Map.insert key value

    delete :: Key -> IO ()
    delete key = atomically $ modifyTVar mapv $ Map.delete key

    query :: Pattern -> IO QueryResults
    query p = fmap (filter (T.isPrefixOf p . fst) . Map.toList)
            $ atomically $ readTVar mapv

main = do
  L.updateGlobalLogger L.rootLoggerName (L.setLevel L.DEBUG)
  kvServer "/tmp/server.ref"
