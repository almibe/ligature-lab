// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let std: Belt.Map.String.t<Model.wordInstance> = Belt.Map.String.fromArray([
  (
    "clear",
    Model.HostFunction({
      doc: "Clear the Datastack.",
      eval: (_, words) => Ok(list{}, words),
      pre: [Model.UnknownT],
      post: [Model.UnknownT],
    }),
  ),
  (
    "pop",
    Model.HostFunction({
      doc: "Remove the top Element from the Stack.",
      eval: (stack, words) =>
        switch List.tail(stack) {
        | Some(tail) => Ok(tail, words)
        | None => Ok(list{}, words)
        },
      pre: [Model.UnknownT],
      post: [Model.UnknownT],
    }),
  ),
  (
    "run",
    Model.HostFunction({
      doc: "Remove a Quote from the Datastack, unquote, and interpret its contents.",
      eval: (stack, words) => {
        switch List.head(stack) {
        | Some(Quote(values)) =>
          Interpreter.evalList(values, words, List.tail(stack)->Option.getUnsafe)
        | _ => %todo
        }
      },
      pre: [Model.QuoteT([])],
      post: [Model.UnknownT],
    }),
  ),
  (
    "id",
    Model.HostFunction({
      doc: "Return the value of the Datastack, basically a no-op.",
      eval: (stack, words) => {
        Ok(stack, words)
      },
      pre: [Model.UnknownT],
      post: [Model.UnknownT],
    }),
  ),
  (
    "dup",
    Model.HostFunction({
      doc: "Repeat the top Element on the Datastack.",
      eval: (stack, words) => {
        switch stack {
        | list{head, ...tail} => Ok(list{head, head, ...tail}, words)
        | _ => %todo
        }
      },
      pre: [Model.UnknownT],
      post: [Model.UnknownT],
    }),
  ),
  (
    "trip",
    Model.Word({
      doc: "Duplicate the top Element on the Datastack twice.",
      quote: list{Model.Word("dup"), Model.Word("dup")},
    }),
  ),
  (
    "count",
    Model.HostFunction({
      doc: "Count the number of Elements in Quotations on the top of the Datastack.",
      eval: (stack, words) => {
        switch stack {
        | list{Quote(quote), ..._} =>
          Ok(list{Model.Int(BigInt.fromInt(quote->List.length)), ...stack}, words)
        | _ => %todo
        }
      },
      pre: [Model.QuoteT([Model.UnknownT])],
      post: [Model.UnknownT],
    }),
  ),
  (
    "cat",
    Model.HostFunction({
      doc: "Combine the top two Quotations on the Datastack and place it on top of the Datastack.",
      eval: (stack, words) => {
        switch stack {
        | list{Quote(quote1), Quote(quote2), ...tail} =>
          Ok(list{Quote(list{...quote1, ...quote2}), ...tail}, words)
        | _ => %todo
        }
      },
      pre: [Model.QuoteT([Model.UnknownT]), Model.QuoteT([Model.UnknownT])],
      post: [Model.QuoteT([Model.UnknownT])],
    }),
  ),
  // (
  //   "assertEqual",
  //   Model.Word({
  //     doc: "Execute two Quotations and compare them with the third.",
  //     quote: list{Model.Word("dup"), Model.Word("dup")}
  //   })
  // ),
  // (
  //   "assertEqual",
  //   Model.HostFunction({
  //     doc: "Check if two Quotations are equal after being ran.",
  //     eval: (stack, words) => {
  //       switch (stach) {
  //         | list{Model.Quote(left), Model.Quote(right), Model.Quote(test), Model.String(message), ...tail} =>
  //           let leftRes = Interpreter.evalList(left, ~words, ~stack=List.empty)
  //           let rightRes = Interpreter.evalList(right, ~words, ~stack=List.empty)

  //           %todo
  //         | _ => %todo
  //       }
  //     },
  //     pre: [
  //       Model.QuoteT([Model.UnknownT]),
  //       Model.QuoteT([Model.UnknownT]),
  //       Model.QuoteT([Model.UnknownT]),
  //       Model.StringT,
  //     ],
  //     post: [UnknownT]
  //   })
  // )
])
