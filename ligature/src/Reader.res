// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
let read = (input: string): result<array<Ligature.statement>, Ligature.ligatureError> => {
    switch Tokenizer.tokenize(input) {
        | Ok(tokens) => {
            switch Parser.parse(tokens) {
                | Ok(network) => Ok(Belt.Set.toArray(network))
                | Error(err) => Error(err)
            }
        }
        | Error(err) => Error(err)
    }
}
