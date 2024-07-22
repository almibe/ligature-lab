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
        Console.log("!!!")
        Console.log(List.head(stack))
        switch List.head(stack) {
          | Some(Quote(values)) => 
            switch (Interpreter.evalList(values, ~words, ~stack=List.tail(stack)->Option.getUnsafe)) {
              | Ok(res) =>
                switch (List.tail(stack)) {
                  | Some(tail) => Ok(List.concat(res, tail))
                  | None => Ok(res)
                }
              | Error(err) => %todo
            }
          | _ => %todo
        }
      }
    })
  )
  // ("test", Model.Quote(list{Model.Int(45n)}))
])
