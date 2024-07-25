@module("vitest") external test: (string, _ => _) => unit = "test"

let check = (left, right) =>
  switch (left, right) {
  | (Ok(left), Ok(right)) => {
      Console.log(left)
      Console.log(right)
      %raw(`Vitest.expect(left).toStrictEqual(right)`)
    }
  | _ => %todo
  }

let empty = Belt.Map.String.empty

let singleTestValues: array<(
  Model.wanderValue,
  result<(list<Model.wanderValue>, Belt.Map.String.t<Model.wordInstance>), string>,
)> = [
  (Model.Int(123n), Ok(list{Model.Int(123n)}, empty)),
  (Model.Quote(list{}), Ok(list{Model.Quote(list{})}, empty)),
  (
    Model.Definition("test", list{}),
    Ok(list{}, Belt.Map.String.fromArray([("test", Model.Word({doc: "Anon", quote: list{}}))])),
  ),
]

let testScripts: array<(
  list<Model.wanderValue>,
  result<(list<Model.wanderValue>, Belt.Map.String.t<Model.wordInstance>), string>,
)> = [
  (list{Model.Int(123n)}, Ok(list{Model.Int(123n)}, HostFunctions.std)),
  (
    list{Model.Int(123n), Model.Int(321n)},
    Ok(list{Model.Int(321n), Model.Int(123n)}, HostFunctions.std),
  ),
]

let testStrings: array<(
  string,
  result<(list<Model.wanderValue>, Belt.Map.String.t<Model.wordInstance>), string>,
)> = [
  ("234", Ok(list{Model.Int(234n)}, HostFunctions.std)),
  ("\"test\"", Ok(list{Model.String("test")}, HostFunctions.std)),
  ("`test`", Ok(list{Model.Identifier({identifier: "test"})}, HostFunctions.std)),
  (
    "234 `test`",
    Ok(list{Model.Identifier({identifier: "test"}), Model.Int(234n)}, HostFunctions.std),
  ),
  ("1 pop", Ok(list{}, HostFunctions.std)),
  ("[]", Ok(list{Model.Quote(list{})}, HostFunctions.std)),
  ("$test", Ok(list{Model.Slot("test")}, HostFunctions.std)),
  ("[$test]", Ok(list{Model.Quote(list{Model.Slot("test")})}, HostFunctions.std)),
  ("[$test] run", Ok(list{Model.Slot("test")}, HostFunctions.std)),
  ("1 [2] run", Ok(list{Model.Int(2n), Model.Int(1n)}, HostFunctions.std)),
  (
    ":x 5; x",
    Ok(
      list{Model.Int(5n)},
      HostFunctions.std->Belt.Map.String.set(
        "x",
        Model.Word({doc: "Anon", quote: list{Model.Int(5n)}}),
      ),
    ),
  ),
]

test("single eval", () => {
  singleTestValues->Array.forEach(((script, result)) => {
    check(Interpreter.evalSingle(script, Belt.Map.String.empty, list{}), result)
  })
})

test("script eval", () => {
  testScripts->Array.forEach(((script, result)) => {
    check(Interpreter.evalList(script, HostFunctions.std, list{}), result)
  })
})

test("string eval", () => {
  testStrings->Array.forEach(((script, result)) => {
    check(Interpreter.evalString(script, HostFunctions.std, list{}), result)
  })
})
