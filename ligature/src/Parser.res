// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
type rec expression =
    | Quote(list<expression>)
    | Word(string)
    | String(string) 
    | Int(bigint) 
    | Identifier(string) 
    | Network(array<expression>)
    | Bytes(Js.TypedArray2.Uint8Array.t)
    | Definition(string, expression)
    | Ignore

let openBraceNibbler = 
    Nibblers.take(Tokenizer.OpenBrace, [Ignore])

let closeBraceNibbler = 
    Nibblers.take(Tokenizer.CloseBrace, [Ignore])

let intNibbler = Nibblers.takeCond((value) => {
    switch value {
        | Tokenizer.Int(value) => Some(Int(value))
        | _ => None
    }
})

let identifierNibbler = Nibblers.takeCond((value) => {
    switch value {
        | Tokenizer.Identifier(value) => Some(Identifier(value))
        | _ => None
    }
})

let stringNibbler = Nibblers.takeCond((value) => {
    switch value {
        | Tokenizer.String(value) => Some(String(value))
        | _ => None
    }
})

let statementNibbler = Nibblers.takeAll([
    identifierNibbler,
    identifierNibbler,
    identifierNibbler
], (res) => res)

let networkNibber = Nibblers.takeAll([
    openBraceNibbler,
    statementNibbler,
    closeBraceNibbler
], (res) => Network(res->Array.getUnsafe(1)))

let expressionNibbler = Nibblers.takeFirst([
    intNibbler,
    identifierNibbler,
    stringNibbler,
    networkNibber,
])

let parse = (input: array<Tokenizer.token>): result<array<expression>, Ligature.ligatureError> => {
    if input->Array.length == 0 {
        Ok([])
    } else {
        let results = []
        let gaze = Gaze.fromArray(input)
        let cont = ref(true)

        while !Gaze.isComplete(gaze) && cont.contents {
            switch Gaze.attempt(expressionNibbler, gaze) {
                | Ok(res) => results->Array.push(res)
                | Error(_) => cont.contents = false
            }
        }

        if cont.contents {
            Ok(results)
        } else {
            Error("Error parsing.")
        }
    }
}