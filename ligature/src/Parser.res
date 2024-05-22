// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let openBraceNibbler: Gaze.nibbler<Tokenizer.token, unit> = Nibblers.take({ Tokenizer.tokenType: OpenBrace, value: "{" }, ())

let parse = (input: array<Tokenizer.token>): result<Ligature.network, Ligature.ligatureError> => {
    if input->Array.length == 0 {
        Ok(Ligature.emptyNetwork)
    } else {
        let results = []
        let gaze = Gaze.fromArray(input)
        let cont = ref(true)
        switch Gaze.attempt(openBraceNibbler, gaze) {
            | Ok(value) => value->ignore
            | Error(_) => cont.contents = false
        }
        while cont.contents && !Gaze.isComplete(gaze) {
            switch Gaze.next(gaze) {
                | Ok({ tokenType: CloseBrace }) => {
                    if !Gaze.isComplete(gaze) {
                        cont.contents = false
                    }
                }
                | Ok({ tokenType: Identifier, value: entity }) => {
                    let attribute = Gaze.next(gaze)
                    let value = Gaze.next(gaze)
                    switch (attribute, value) {
                        | (Ok({ tokenType: Identifier, value: attribute }), Ok({ tokenType: Identifier, value: value })) => {
                            results->Array.push(({ Ligature.identifier: entity }, { Ligature.identifier: attribute }, Ligature.Identifier({identifier: value})))
                        }
                        | _ => cont.contents = false
                    }
                }
                | Ok(_) => cont.contents = false
                | Error(_) => cont.contents = false
            }
            if !Gaze.isComplete(gaze) && cont.contents {
                switch Gaze.peek(gaze) {
                    | Ok({tokenType: CloseBrace}) => {
                        Gaze.next(gaze)->ignore
                        if !Gaze.isComplete(gaze) {
                            cont.contents = false
                        }
                    }
                    | Ok({tokenType: Comma}) => {
                        Gaze.next(gaze)->ignore
                    }
                    | _ => {
                        cont.contents = false
                    }
                }
            }
        }
        if cont.contents {
            Ok(Ligature.networkFromArray(results))
        } else {
            Error("Error parsing.")
        }
    }
}
