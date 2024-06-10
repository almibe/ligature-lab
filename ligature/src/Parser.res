// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type rec expression =
    | Name(string)
    | Identifier(string)
    | Int(bigint)
    | Bytes
    | String(string)
    | Network(array<expression>)
    | Binding(string, expression)
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

        // switch Gaze.attempt(openBraceNibbler, gaze) {
        //     | Ok(value) => value->ignore
        //     | Error(_) => cont.contents = false
        // }
        // while cont.contents && !Gaze.isComplete(gaze) {
        //     switch Gaze.next(gaze) {
        //         | Ok({ tokenType: CloseBrace }) => {
        //             if !Gaze.isComplete(gaze) {
        //                 cont.contents = false
        //             }
        //         }
        //         | Ok({ tokenType: Identifier, value: entity }) => {
        //             let attribute = Gaze.next(gaze)
        //             let value = Gaze.next(gaze)
        //             switch (attribute, value) {
        //                 | (Ok({ tokenType: Identifier, value: attribute }), Ok({ tokenType: Identifier, value: value })) => {
        //                     results->Array.push(({ Ligature.identifier: entity }, { Ligature.identifier: attribute }, Ligature.Identifier({identifier: value})))
        //                 }
        //                 | _ => cont.contents = false
        //             }
        //         }
        //         | Ok(_) => cont.contents = false
        //         | Error(_) => cont.contents = false
        //     }
        //     if !Gaze.isComplete(gaze) && cont.contents {
        //         switch Gaze.peek(gaze) {
        //             | Ok({tokenType: CloseBrace}) => {
        //                 Gaze.next(gaze)->ignore
        //                 if !Gaze.isComplete(gaze) {
        //                     cont.contents = false
        //                 }
        //             }
        //             | Ok({tokenType: Comma}) => {
        //                 Gaze.next(gaze)->ignore
        //             }
        //             | _ => {
        //                 cont.contents = false
        //             }
        //         }
        //     }
        // }
        if cont.contents {
            Ok(results)
        } else {
            Error("Error parsing.")
        }
    }
}
