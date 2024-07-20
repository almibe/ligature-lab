// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type engineState = {
    mutable stack: list<Model.wanderValue>
}

let valueToJS = (value: Model.wanderValue) =>
    switch (value) {
        | Model.Int(intValue) => %raw(`BigInt(value._0)`)
        | Model.String(value) => %raw(`value._0`)
        | Model.Identifier({identifier: value}) => %raw(`value._0.identifier`)
        // | Model.Word(value) => Word(value)
        // | Model.Bytes(value) => value
        // | Model.Identifier(value) => value
        // | Model.Definition(_, _) => %todo
    }

let newEngine = () => {
    let state = {
        stack: list{}
    }
    {
        "evalScript": (script: string) => {
            switch (Interpreter.evalString(script, ~stack=state.stack)) {
                | Ok(res) => state.stack = res
                | Error(err) => %todo
            }
        }
        "eval": (value: Model.wanderValue) => {
            switch (Interpreter.evalSingle(value, ~stack=state.stack)) {
                | Ok(res) => state.stack = res
                | Error(err) => %todo
            }
        },
        "readStack": () => {
            state.stack
            ->List.map(valueToJS)
            ->List.toArray
        }
    }
}
