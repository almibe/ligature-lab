// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type tokenType =
//    | Name
//    | EqualSign
    | OpenBrace
    | CloseBrace
    | Identifier
//    | Int
//    | Bytes
//    | String
//    | OpenSquare
//    | CloseSquare
//    | Colon
    | Comma
    | Ignore

type token = { tokenType: tokenType, value: string }

let ignoreToken = { tokenType: Ignore, value: "" }

let openBraceNibbler: Gaze.nibbler<string, token> = Nibblers.take("{", { tokenType: OpenBrace, value: "{" })

let closeBraceNibbler = Nibblers.take("}", { tokenType: CloseBrace, value: "}" })

let commaNibbler: Gaze.nibbler<string, token> = Nibblers.take(",", { tokenType: Comma, value: "," })

let backTickNibber = Nibblers.take("`", ignoreToken)

let whiteSpaceNibbler = Nibblers.take(" ", ignoreToken)

let identifierValueNibbler: Gaze.nibbler<string, token> = 
    Nibblers.takeWhile ((value) => value != "`", (value) => ignoreToken)

let identifierNibbler: Gaze.nibbler<string, token> = Nibblers.takeAll([
    backTickNibber,
    identifierValueNibbler,
    backTickNibber
], (res) => res->Array.getUnsafe(1))

let tokenNibbler = Nibblers.takeFirst([
    openBraceNibbler, 
    closeBraceNibbler, 
    commaNibbler, 
    identifierNibbler, 
    whiteSpaceNibbler
])

let tokenize = (input: string): result<array<token>, Ligature.ligatureError> => {
    let gaze = Gaze.fromString(input)
    let results = []
    let cont = ref(true)
    while !Gaze.isComplete(gaze) && cont.contents {
        switch Gaze.attempt(tokenNibbler, gaze) {
            | Ok(res) => results->Array.push(res)
            | Error(_) => cont.contents = false
        }
    }
    if cont.contents {
        Ok(results)
    } else {
        Error("Error tokenizing." ++ Option.getUnsafe(JSON.stringifyAny(results)))
    }
}
