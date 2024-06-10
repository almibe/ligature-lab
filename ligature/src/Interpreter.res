// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let interpretExpression = (expression: Parser.expression): result<Wander.wanderValue, Ligature.ligatureError> => {
    switch expression {
        | Parser.Int(value) => Ok(Wander.Int(value))
        | Parser.Identifier(value) => Ok(Wander.Identifier({ identifier: value } ))
        | Parser.String(value) => Ok(Wander.String(value))
        | Parser.Network(value) => Ok(Wander.Network([]))
        | _ => %todo
    }
}

let interpret = (ast: array<Parser.expression>): result<Wander.wanderValue, Ligature.ligatureError> => {
    let result = ref(Ok(Wander.String(""))) //TODO replace with empty namespace
    ast->Array.forEach(expr => {
        result.contents = interpretExpression(expr)
    })
    result.contents
}

@genType
let runWander = (input: string): result<Wander.wanderValue, Ligature.ligatureError> => {
    switch Tokenizer.tokenize(input) {
        | Ok(tokens) => {
            switch Parser.parse(tokens) {
                | Ok(ast) => interpret(ast)
                | Error(err) => Error(err)
            }
        }
        | Error(err) => Error(err)
    }
}
