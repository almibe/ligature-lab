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
  | Network(Ligature.network)
  | Bytes(Js.TypedArray2.Uint8Array.t)
  | Definition(string, wanderValue)
