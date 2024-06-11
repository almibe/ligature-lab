// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let writeIdentifier = (identifier: Ligature.identifier) => "`" ++ identifier.identifier ++ "`"

let writeValue = (value: Ligature.value) =>
    switch value {
        | String(value) => %todo
        | Identifier(value) => writeIdentifier(value)
//        | Bytes(value) => %todo
        | Int(value) => %todo
    }

let writeStatement = (statement: Ligature.statement) => {
    let (e, a, v) = statement
    writeIdentifier(e) ++ " " ++ writeIdentifier(a) ++ " " ++ writeValue(v)
}

@genType
let write = (network: Ligature.network): string => {
    let res = network->Belt.Set.reduce("", (state, statement) => state ++ writeStatement(statement) ++ ", ")
    "{" ++ res ++ "}"
}

@genType
let printResult = (input: result<Wander.wanderValue, Ligature.ligatureError>) => {
    switch input {
        | Ok(Int(value)) => BigInt.toString(value)
        | Ok(String(value)) => Js.Json.stringifyAny(value)->Option.getUnsafe
        | Ok(Identifier(value)) => writeIdentifier(value)
        | Ok(Network(value)) => write(value)
        | Error(err) => "Error: " ++ err
    }
}
