// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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

let tokenize = (input: string): result<array<token>, Ligature.ligatureError> => {
    let gaze = Gaze.fromString(input)
    let results = []
    switch Nibblers.take("{", gaze) {
        | Ok(res) => {
            results->Array.push({ tokenType: OpenBrace, value: "{" })
            Ok(results)
        }
        | Error(_) => Error("Error tokenizing.")
    }
}
