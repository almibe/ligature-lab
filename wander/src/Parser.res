// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
type rec expression =
  | Quote(list<expression>)
  | Word(string)
  | String(string)
  | Int(bigint)
  | Identifier(string)
  | Slot(string)
  | Bytes(Js.TypedArray2.Uint8Array.t)
  | Definition(string, list<expression>)
  | Ignore

let intNibbler = Nibblers.takeCond(value => {
  switch value {
  | Tokenizer.Int(value) => Some(Int(value))
  | _ => None
  }
})

let wordNibbler = Nibblers.takeCond(value => {
  switch value {
  | Tokenizer.Word(value) => Some(Word(value))
  | _ => None
  }
})

let identifierNibbler = Nibblers.takeCond(value => {
  switch value {
  | Tokenizer.Identifier(value) => Some(Identifier(value))
  | _ => None
  }
})

let slotNibbler = Nibblers.takeCond(value => {
  switch value {
  | Tokenizer.Slot(value) => Some(Slot(value))
  | _ => None
  }
})

let stringNibbler = Nibblers.takeCond(value => {
  switch value {
  | Tokenizer.String(value) => Some(String(value))
  | _ => None
  }
})

let quoteNibbler: (Gaze.gaze<Tokenizer.token>) => result<expression, Gaze.gazeError> = (gaze) => {
  let rec quoteNibblerInner = gaze => {
    let complete = ref(false)
    let error = ref(false)
    let contents = ref(list{})
    while !complete.contents && !error.contents {
      switch Gaze.next(gaze) {
      | Ok(Tokenizer.Slot(slot)) => contents.contents = list{...contents.contents, Slot(slot)}
      | Ok(Tokenizer.CloseSquare) => complete.contents = true
      | Ok(Tokenizer.OpenSquare) => {
        switch (quoteNibblerInner(gaze)) {
          | Ok(res) => contents.contents = list{...contents.contents, res}
          | Error(_) => %todo
        }
      }
      | Ok(Tokenizer.Int(value)) => contents.contents = list{...contents.contents, Int(value)}
      | Ok(Tokenizer.String(value)) => contents.contents = list{...contents.contents, String(value)}
      | Ok(Tokenizer.Word(value)) => contents.contents = list{...contents.contents, Word(value)}
      | Ok(Tokenizer.Identifier(value)) =>
        contents.contents = list{...contents.contents, Identifier(value)}
      | _ => error.contents = true
      }
    }
    if error.contents {
      Error(Gaze.NoMatch)
    } else {
      Ok(Quote(contents.contents))
    }
  }
  if (Gaze.next(gaze) == Ok(Tokenizer.OpenSquare)) {
    quoteNibblerInner(gaze)
  } else {
    Error(NoMatch)
  }}

// let definitionNibbler: Gaze.gaze<Tokenizer.token> => result<expression, Gaze.gazeError> = gaze =>
//   if Gaze.next(gaze) == Ok(Tokenizer.Colon) {
//     let complete = ref(false)
//     let error = ref(false)
//     let contents = ref(list{})
//     switch Gaze.next(gaze) {
//     | Ok(Tokenizer.Word(name)) => {
//         while !complete.contents && !error.contents {
//           switch Gaze.next(gaze) {
//           | Ok(Tokenizer.Slot(slot)) => contents.contents = list{...contents.contents, Slot(slot)}
//           | Ok(Tokenizer.Semicolon) => complete.contents = true
//           | Ok(Tokenizer.Int(value)) => contents.contents = list{...contents.contents, Int(value)}
//           | Ok(Tokenizer.String(value)) =>
//             contents.contents = list{...contents.contents, String(value)}
//           | Ok(Tokenizer.Word(value)) => contents.contents = list{...contents.contents, Word(value)}
//           | Ok(Tokenizer.Identifier(value)) =>
//             contents.contents = list{...contents.contents, Identifier(value)}
//           | _ => error.contents = true
//           }
//         }
//         if error.contents {
//           Error(NoMatch)
//         } else {
//           Ok(Definition(name, contents.contents))
//         }
//       }
//     | _ => Error(NoMatch)
//     }
//   } else {
//     Error(NoMatch)
//   }

let expressionNibbler = Nibblers.takeFirst([
  intNibbler,
  identifierNibbler,
  slotNibbler,
  stringNibbler,
  wordNibbler,
  quoteNibbler,
//  definitionNibbler,
])

let parse = (input: array<Tokenizer.token>): result<array<expression>, Ligature.ligatureError> => {
  if input->Array.length == 0 {
    Ok([])
  } else {
    let results = []
    let gaze = Gaze.fromArray(input)
    let cont = ref(true)

    while !Gaze.isComplete(gaze) && cont.contents {
      switch Gaze.attempt(expressionNibbler, gaze) {
      | Ok(res) => results->Array.push(res)
      | Error(_) => cont.contents = false
      }
    }

    if cont.contents {
      Ok(results)
    } else {
      Error("Error parsing.")
    }
  }
}
