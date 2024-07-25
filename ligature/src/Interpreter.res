// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

let interpretIdentifier = (expression: Parser.expression): result<
  Ligature.identifier,
  Ligature.ligatureError,
> => {
  switch expression {
  | Parser.Identifier(value) => Ok({Ligature.identifier: value})
  | _ => %todo
  }
}

let interpretWord = word => %todo("test")

let interpretExpression = (expression: Parser.expression): result<
  Model.wanderValue,
  Ligature.ligatureError,
> => {
  switch expression {
  | Parser.Int(value) => Ok(Model.Int(value))
  | Parser.Identifier(value) => Ok(Model.Identifier({identifier: value}))
  | Parser.String(value) => Ok(Model.String(value))
  | Parser.Word(word) => interpretWord(word)
  | _ => %todo
  }
}

@genType
let rec evalList = (
  values: list<Model.wanderValue>,
  words: Belt.Map.String.t<Model.wordInstance>,
  stack: list<Model.wanderValue>,
): result<(list<Model.wanderValue>, Belt.Map.String.t<Model.wordInstance>), Ligature.ligatureError> => {
  let stack = ref(stack)
  let wordsRef = ref(words)
  values->List.forEach(value => {
    switch evalSingle(value, wordsRef.contents, stack.contents) {
    | Ok((stackRes, wordsRes)) => {
      wordsRef := wordsRes
      stack := stackRes
    }
    | Error(res) => Console.log(res)
    }
  })
  Ok((stack.contents, wordsRef.contents))
}

@genType
and evalSingle = (
  value: Model.wanderValue,
  words: Belt.Map.String.t<Model.wordInstance>,
  stack: list<Model.wanderValue>,
): result<(list<Model.wanderValue>, Belt.Map.String.t<Model.wordInstance>), Ligature.ligatureError> =>
  switch value {
  | Definition(name, quote) => Ok(stack, words->Belt.Map.String.set(name, Model.Word({doc: "Anon", quote: quote})))
  | Word(word) =>
    switch Belt.Map.String.get(words, word) {
    | Some(HostFunction(hostFunction)) => hostFunction.eval(stack, words)
    | Some(Word(quote)) => evalList(quote.quote, words, stack)
    | None => Error("Could not find Word " ++ word)
    }
  | value => Ok(list{value, ...stack}, words)
  }

let rec processExpressions = (expressions: array<Parser.expression>): list<Model.wanderValue> =>
  Array.filter(expressions, expression =>
    switch expression {
    | Parser.Ignore => false
    | _ => true
    }
  )
  ->Array.map(expression =>
    switch expression {
    | Parser.Int(value) => Model.Int(value)
    | Parser.String(value) => Model.String(value)
    | Parser.Identifier(value) => Model.Identifier({identifier: value})
    | Parser.Word(value) => Model.Word(value)
    | Parser.Quote(quote) =>
      quote
      ->List.map(expr => processExpression(expr))
      ->Model.Quote
    | Parser.Bytes(_) => %todo
    | Parser.Definition(name, quote) => Model.Definition(name, processExpressions(quote->List.toArray))
    | Parser.Slot(slot) => Model.Slot(slot)
    | Parser.Ignore => raise(Failure("should not reach"))
    }
  )
  ->List.fromArray

and processExpression = (expression: Parser.expression): Model.wanderValue =>
  switch expression {
  | Parser.Int(value) => Model.Int(value)
  | Parser.String(value) => Model.String(value)
  | Parser.Identifier(value) => Model.Identifier({identifier: value})
  | Parser.Slot(slot) => Model.Slot(slot)
  | Parser.Word(value) => Model.Word(value)
  | Parser.Quote(quote) => Quote(processExpressions(List.toArray(quote)))
  | Parser.Bytes(_) => %todo
  | Parser.Definition(name, quote) => Definition(name, processExpressions(quote->List.toArray))
  | Parser.Ignore => raise(Failure("should not reach"))
  }

@genType
let evalString = (
  input: string,
  words: Belt.Map.String.t<Model.wordInstance>,
  stack: list<Model.wanderValue>,
): result<(list<Model.wanderValue>, Belt.Map.String.t<Model.wordInstance>), Ligature.ligatureError> => {
  switch Tokenizer.tokenize(input) {
  | Ok(tokens) =>
    switch Parser.parse(tokens) {
    | Ok(ast) => {
        let ast = processExpressions(ast)
        evalList(ast, words, stack)
      }
    | Error(err) => Error(err)
    }
  | Error(err) => Error(err)
  }
}
