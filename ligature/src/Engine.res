// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type engineState = {
  stackListeners: array<array<unknown> => unit>,
  mutable stack: list<Model.wanderValue>,
}

let valueToJS = (value: Model.wanderValue) =>
  switch value {
  | Model.Int(intValue) => %raw(`BigInt(value._0)`)
  | Model.String(value) => %raw(`value._0`)
  | Model.Identifier({identifier: value}) => %raw(`value._0.identifier`)
  //  | Model.Quote(quote) => %raw(`value._0`)
  // | Model.Word(value) => Word(value)
  // | Model.Bytes(value) => value
  // | Model.Identifier(value) => value
  // | Model.Definition(_, _) => %todo
  }

let stackToJS = (stack: list<Model.wanderValue>) =>
  stack
  ->List.toArray
  ->Array.map(valueToJS)

let newEngine = () => {
  let state = {
    stack: list{},
    stackListeners: [],
  }
  let setStack = (stack: list<Model.wanderValue>) => {
    state.stack = stack
    state.stackListeners->Array.forEach(listener => listener(stackToJS(stack)))
  }

  {
    "setStack": (stack: list<Model.wanderValue>) => setStack(stack),
    "evalScript": (script: string) => {
      switch Interpreter.evalString(script, ~words=HostFunctions.std, ~stack=state.stack) {
      | Ok(res) => setStack(res)
      | Error(err) => setStack(list{Model.Error("Error running command"), ...state.stack})
      }
    },
    "eval": (value: Model.wanderValue) => {
      switch Interpreter.evalSingle(value, ~words=HostFunctions.std, ~stack=state.stack) {
      | Ok(res) => setStack(res)
      | Error(err) => %todo
      }
    },
    "readStack": () => {
      state.stack
      ->List.map(valueToJS)
      ->List.toArray
    },
    "addStackListener": listener => {
      Array.push(state.stackListeners, listener)
    },
  }
}
