// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type token =
    | Name(string)
    | EqualSign
    | OpenBrace
    | CloseBrace
    | Identifier(string)
    | Int(bigint)
//    | Bytes
    | String(string)
    | OpenSquare
    | CloseSquare
    | Colon
    | Comma
    | Ignore

let openBraceNibbler: Gaze.nibbler<string, token> = Nibblers.take("{", OpenBrace)

let closeBraceNibbler = Nibblers.take("}", CloseBrace)

let commaNibbler: Gaze.nibbler<string, token> = Nibblers.take(",", Comma)

let backTickNibber = Nibblers.take("`", Ignore)

let doubleQuoteNibber = Nibblers.take("\"", Ignore)

let whiteSpaceNibbler = Nibblers.take(" ", Ignore)

let identifierValueNibbler: Gaze.nibbler<string, token> = 
    Nibblers.takeWhile ((value) => value != "`", (value) => Identifier(Array.join(value, "")))

let stringValueNibbler: Gaze.nibbler<string, token> = 
    Nibblers.takeWhile ((value) => value != "\"", (value) => String(Array.join(value, "")))

let intRegex = RegExp.fromString("[0-9]")

let intNibbler: Gaze.nibbler<string, token> =
    Nibblers.takeWhile ((value) => String.match(value, intRegex)->Option.isSome, (value) => Int(Array.join(value, "")->BigInt.fromString))

let identifierNibbler: Gaze.nibbler<string, token> = Nibblers.takeAll([
    backTickNibber,
    identifierValueNibbler,
    backTickNibber
], (res) => res->Array.getUnsafe(1))

let stringNibbler: Gaze.nibbler<string, token> = Nibblers.takeAll([
    doubleQuoteNibber,
    stringValueNibbler,
    doubleQuoteNibber
], (res) => res->Array.getUnsafe(1))

let tokenNibbler = Nibblers.takeFirst([
    openBraceNibbler, 
    closeBraceNibbler, 
    commaNibbler, 
    identifierNibbler, 
    whiteSpaceNibbler,
    intNibbler,
    stringNibbler,
])

let tokenize = (input: string): result<array<token>, Ligature.ligatureError> => {
    let gaze = Gaze.fromString(input)
    let results = []
    let cont = ref(true)
    while !Gaze.isComplete(gaze) && cont.contents {
        switch Gaze.attempt(tokenNibbler, gaze) {
            | Ok(res) => {
                if res != Ignore {
                    results->Array.push(res)
                }
            }
            | Error(_) => cont.contents = false
        }
    }
    if cont.contents {
        Ok(results)
    } else {
        Error("Error tokenizing." ++ Option.getUnsafe(JSON.stringifyAny(results)))
    }
}
