{-# LANGUAGE ScopedTypeVariables, OverloadedStrings #-}
module ADL.Core.Comms.Serialisation(
  SerialisationType(..),
  serialise,
  deserialise
  ) where

import qualified Data.Aeson as JSON
import qualified Data.ByteString.Lazy as LBS
import qualified Data.Vector as V
import qualified Data.Text as T

import ADL.Sys.Sinkimpl

import ADL.Core.Value


serialise :: (ADLValue a) => SerialisationType -> a -> LBS.ByteString
serialise (SerialisationType st) | st == "json" = serialiseJSON

deserialise :: (ADLValue a) => SerialisationType -> LBS.ByteString -> Either String a
deserialise (SerialisationType st) | st == "json" = deserialiseJSON

-- Messages needs to be packed in a single element JSON array
-- so that we can carrt arbtrary JSON values.

serialiseJSON :: (ADLValue a) => a -> LBS.ByteString
serialiseJSON a = JSON.encode $ JSON.Array $ V.fromList [aToJSON (jsonSerialiser defaultJSONFlags) a]

deserialiseJSON :: forall a . (ADLValue a) => LBS.ByteString -> Either String a
deserialiseJSON lbs =  do
  v <- JSON.eitherDecode' lbs
  case v of
    (JSON.Array a) -> case V.toList a of
      [j] -> case aFromJSON (jsonSerialiser defaultJSONFlags) j of
        Nothing -> Left ("Can't parse JSON to type " ++ T.unpack (atype (defaultv::a)))
        (Just a1) -> Right a1
      _ -> Left emsg
    _ -> Left emsg
  where
    emsg = "Top level JSON object must be a single element vector"
