// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
type identifier = { identifier: string }

@genType
type value = | String(string) | Int(bigint) | Identifier(identifier) | Bytes(Js.TypedArray2.Uint8Array.t)

@genType
type statement = (identifier, identifier, value)

@genType
type network = Js.Set.t<statement>

type tokenType =
//    | Name
//    | EqualSign
    | OpenBrace
    | CloseBrace
    | Identifier
    | Int
    | Bytes
    | String
//    | OpenSquare
//    | CloseSquare
//    | Colon
    | Comma

type token = { tokenType: tokenType, value: string }

let tokenize = (input: string): array<token> => {
    let gaze = Gaze.fromString(input)
    let results = []
    switch Nibblers.take("{", gaze) {
        | Ok(res) => %todo
        | Error(_) => %todo
    }
    results
}

@genType
let parse = (input: array<token>): network =>
    %todo
