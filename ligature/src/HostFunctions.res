// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let std: Belt.Map.String.t<Model.wordInstance> = Belt.Map.String.fromArray([
  (
    "clear",
    Model.HostFunction({
      doc: "",
      eval: (_, _) => Ok(list{}),
    }),
  ),
  (
    "pop",
    Model.HostFunction({
      doc: "",
      eval: (stack, words) =>
        switch List.tail(stack) {
        | Some(tail) => Ok(tail)
        | None => Ok(list{})
        },
    }),
  ),
  (
    "apply",
    Model.HostFunction({
      doc: "",
      eval: (stack, words) => {
        switch List.head(stack) {
        | Some(Quote(values)) =>
          Interpreter.evalList(values, ~words, ~stack=List.tail(stack)->Option.getUnsafe)
        | _ => %todo
        }
      },
    }),
  ),
])
