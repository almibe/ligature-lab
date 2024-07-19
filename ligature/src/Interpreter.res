// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let interpretIdentifier = (expression: Parser.expression): result<Ligature.identifier, Ligature.ligatureError> => {
    switch expression {
        | Parser.Identifier(value) => Ok({Ligature.identifier: value})
        | _ => %todo
    }
}

let rec interpretExpression = (expression: Parser.expression): result<Wander.wanderValue, Ligature.ligatureError> => {
    switch expression {
        | Parser.Int(value) => Ok(Wander.Int(value))
        | Parser.Identifier(value) => Ok(Wander.Identifier({ identifier: value } ))
        | Parser.String(value) => Ok(Wander.String(value))
        | Parser.Network(value) => interpretNetwork(value)
        | _ => %todo
    }
}

and interpretNetwork = (values: array<Parser.expression>): result<Wander.wanderValue, Ligature.ligatureError> => {
    let entity = interpretIdentifier(values->Array.getUnsafe(0))->Result.getExn
    let attribute = interpretIdentifier(values->Array.getUnsafe(1))->Result.getExn
    let value = Ligature.Identifier(interpretIdentifier(values->Array.getUnsafe(2))->Result.getExn)

    Ok(Wander.Network(Ligature.networkFromArray([(entity, attribute, value)])))
}

let interpret = (ast: array<Parser.expression>, words: Belt.Map.String.t<list<Wander.wanderValue>>): result<Wander.wanderValue, Ligature.ligatureError> => {
    let result = ref(Ok(Wander.String(""))) //TODO replace with empty namespace
    ast->Array.forEach(expr => {
        result.contents = interpretExpression(expr)
    })
    result.contents
}

@genType
let eval = (value: Wander.wanderValue, ~words: Belt.Map.String.t<list<Wander.wanderValue>> = Belt.Map.String.empty, ~stack: list<Wander.wanderValue> = list{}): result<list<Wander.wanderValue>, Ligature.ligatureError> => 
    switch (value) {
        | Word(word) =>
            switch (Belt.Map.String.get(words, word)) {
                | Some(word) => %todo
                | None => Error("Could not find Word " ++ word)
            }
        | value => Ok(list{value, ...stack})
    }

@genType
let evalString = (input: string, ~words: Belt.Map.String.t<list<Wander.wanderValue>> = Belt.Map.String.empty): result<Wander.wanderValue, Ligature.ligatureError> => {
    switch Tokenizer.tokenize(input) {
        | Ok(tokens) => {
            switch Parser.parse(tokens) {
                | Ok(ast) => interpret(ast, words)
                | Error(err) => Error(err)
            }
        }
        | Error(err) => Error(err)
    }
}
