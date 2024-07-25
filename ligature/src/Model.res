// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
type rec wanderValue =
  | Quote(list<wanderValue>)
  | Word(string)
  | String(string)
  | Int(bigint)
  | Identifier(Ligature.identifier)
  | Slot(string)
  //  | Network(Ligature.network)
  | Bytes(Js.TypedArray2.Uint8Array.t)
  | Definition(string, list<wanderValue>)
  | Error(string)

type rec wanderType =
  | AnyT
  | StringT
  | IntT
  | QuoteT(array<wanderType>)
  | UnknownT

@genType
type rec hostFunction = {
  doc: string,
  eval: (
    list<wanderValue>,
    Belt.Map.String.t<wordInstance>,
  ) => result<(list<wanderValue>, Belt.Map.String.t<wordInstance>), Ligature.ligatureError>,
  pre: array<wanderType>,
  post: array<wanderType>,
}

@genType
and word = {
  doc: string,
  quote: list<wanderValue>  
}

@genType
and wordInstance =
  | Word(word)
  | HostFunction(hostFunction)
