// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type token =
  | Word(string)
  | EqualSign
  | OpenBrace
  | CloseBrace
  | Identifier(string)
  | Slot(string)
  | Int(bigint)
  | String(string)
  | OpenSquare
  | CloseSquare
  | Colon
  | Comma
  | Ignore

let openBraceNibbler: Gaze.nibbler<string, token> = Nibblers.take("{", OpenBrace)

let closeBraceNibbler = Nibblers.take("}", CloseBrace)

let openSquareNibbler: Gaze.nibbler<string, token> = Nibblers.take("[", OpenSquare)

let closeSqureNibbler = Nibblers.take("]", CloseSquare)

let commaNibbler: Gaze.nibbler<string, token> = Nibblers.take(",", Comma)

let backTickNibber = Nibblers.take("`", Ignore)

let dollarSignNibber = Nibblers.take("$", Ignore)

let doubleQuoteNibber = Nibblers.take("\"", Ignore)

let whiteSpaceNibbler = Nibblers.take(" ", Ignore)

let identifierValueNibbler: Gaze.nibbler<string, token> = Nibblers.takeWhile(
  value => value != "`",
  value => Identifier(Array.join(value, "")),
)

let slotRegex = RegExp.fromString("[a-zA-Z_0-9]")

let slotValueNibbler: Gaze.nibbler<string, token> = Nibblers.takeWhile(
  value => String.match(value, slotRegex)->Option.isSome,
  value => Slot(Array.join(value, "")),
)

let stringValueNibbler: Gaze.nibbler<string, token> = Nibblers.takeWhile(
  value => value != "\"",
  value => String(Array.join(value, "")),
)

let intRegex = RegExp.fromString("[0-9]")

let intNibbler: Gaze.nibbler<string, token> = Nibblers.takeWhile(
  value => String.match(value, intRegex)->Option.isSome,
  value => Int(Array.join(value, "")->BigInt.fromString),
)

let identifierNibbler: Gaze.nibbler<string, token> = Nibblers.takeAll(
  [backTickNibber, identifierValueNibbler, backTickNibber],
  res => res->Array.getUnsafe(1),
)

let slotNibbler: Gaze.nibbler<string, token> = Nibblers.takeAll(
  [dollarSignNibber, slotValueNibbler],
  res => res->Array.getUnsafe(1),
)

let wordRegex = RegExp.fromString("[_a-zA-Z.]")

let wordNibbler: Gaze.nibbler<string, token> = Nibblers.takeWhile(
  value => String.match(value, wordRegex)->Option.isSome,
  value => Word(Array.join(value, "")),
)

let stringNibbler: Gaze.nibbler<string, token> = Nibblers.takeAll(
  [doubleQuoteNibber, stringValueNibbler, doubleQuoteNibber],
  res => res->Array.getUnsafe(1),
)

let tokenNibbler = Nibblers.takeFirst([
  wordNibbler,
  openBraceNibbler,
  closeBraceNibbler,
  openSquareNibbler,
  closeSqureNibbler,
  commaNibbler,
  identifierNibbler,
  slotNibbler,
  whiteSpaceNibbler,
  intNibbler,
  stringNibbler,
])

let tokenize = (input: string): result<array<token>, Ligature.ligatureError> => {
  let gaze = Gaze.fromString(input)
  let results = []
  let cont = ref(true)
  while !Gaze.isComplete(gaze) && cont.contents {
    switch Gaze.attempt(tokenNibbler, gaze) {
    | Ok(res) =>
      if res != Ignore {
        results->Array.push(res)
      }
    | Error(_) => cont.contents = false
    }
  }
  if cont.contents {
    Ok(results)
  } else {
    Error("Error tokenizing." ++ Option.getUnsafe(JSON.stringifyAny(results)))
  }
}
