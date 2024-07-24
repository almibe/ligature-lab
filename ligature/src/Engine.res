// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
type engineState = {
  stackListeners: array<array<unknown> => unit>,
  mutable stack: list<Model.wanderValue>,
  mutable words: Belt.Map.String.t<Model.wordInstance>,
}

@genType
let rec quoteToJS = (value: list<Model.wanderValue>) => {
  value
  ->List.map(value => valueToJS(value))
  ->List.toArray
}

@genType
and valueToJS = (value: Model.wanderValue) => {
  switch value {
  | Model.Int(intValue) => %raw(`BigInt(value._0)`)
  | Model.String(value) => %raw(`value._0`)
  | Model.Identifier({identifier: value}) => %raw(`{identifier: value._0.identifier}`)
  | Model.Quote(quote) => %raw(`quoteToJS(value._0)`)
  | Model.Word(value) => %raw(`{word: value._0}`)
  | Model.Slot(slot) => %raw(`{slot: value._0}`)
  // | Model.Bytes(value) => value
  // | Model.Identifier(value) => value
  // | Model.Definition(_, _) => %todo
  }
}

@genType
let stackToJS = (stack: list<Model.wanderValue>) =>
  stack
  ->List.toArray
  ->Array.map(valueToJS)

@genType
let newEngine = (lookup: string) => {
  let state = {
    stack: list{},
    stackListeners: [],
    words: HostFunctions.std,
  }
  let setStack = (stack: list<Model.wanderValue>) => {
    state.stack = stack
    state.stackListeners->Array.forEach(listener => listener(stackToJS(stack)))
  }

  {
    "setStack": (stack: list<Model.wanderValue>) => setStack(stack),
    "evalScript": (script: string) => {
      switch Interpreter.evalString(script, state.words, state.stack) {
      | Ok(res) => setStack(res)
      | Error(err) => setStack(list{Model.Error("Error running command"), ...state.stack})
      }
    },
    "eval": (value: Model.wanderValue) => {
      switch Interpreter.evalSingle(value, state.words, state.stack) {
      | Ok(res) => setStack(res)
      | Error(err) => Console.log(err)
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
    "addHostFunction": (name: string, fn: Model.hostFunction) => {
      state.words = Belt.Map.String.set(state.words, name, Model.HostFunction(fn))
    },
  }
}
