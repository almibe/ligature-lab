@module("vitest") external test: (string, _ => _) => unit = "test"

let check = (left, right) => %raw(`Vitest.expect(left).toStrictEqual(right)`)

let singleTestValues: array<(Wander.wanderValue, result<list<Wander.wanderValue>, string>)> = [
    (Wander.Int(123n), Ok(list{Wander.Int(123n)})),
]

let testScripts: array<(list<Wander.wanderValue>, result<list<Wander.wanderValue>, string>)> = [
    (list{Wander.Int(123n)}, Ok(list{Wander.Int(123n)})),
    (list{Wander.Int(123n), Wander.Int(321n)}, Ok(list{Wander.Int(321n), Wander.Int(123n)})),
]

let testStrings: array<(string, result<list<Wander.wanderValue>, string>)> = [
    ("234", Ok(list{Wander.Int(234n)})),
  //  ("\"test\"", Ok(list{Wander.String("test")})),
  //  ("234 `test`", Ok(list{Wander.Int(234n), Wander.Identifier({identifier: "test"})})),
]

test("single eval", () => {
    singleTestValues->Array.forEach(((script, result)) => {
        check(Interpreter.evalSingle(script), result)
    })
})

test("script eval", () => {
    testScripts->Array.forEach(((script, result)) => {
        check(Interpreter.eval(script), result)
    })
})

test("string eval", () => {
    testStrings->Array.forEach(((script, result)) => {
        check(Interpreter.evalString(script), result)
    })
})
