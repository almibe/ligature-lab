@module("vitest") external test: (string, _ => _) => unit = "test"

let check = (left, right) => %raw(`Vitest.expect(left).toStrictEqual(right)`)

let singleTestValues: array<(Model.wanderValue, result<list<Model.wanderValue>, string>)> = [
    (Model.Int(123n), Ok(list{Model.Int(123n)})),
]

let testScripts: array<(list<Model.wanderValue>, result<list<Model.wanderValue>, string>)> = [
    (list{Model.Int(123n)}, Ok(list{Model.Int(123n)})),
    (list{Model.Int(123n), Model.Int(321n)}, Ok(list{Model.Int(321n), Model.Int(123n)})),
]

let testStrings: array<(string, result<list<Model.wanderValue>, string>)> = [
    ("234", Ok(list{Model.Int(234n)})),
    ("\"test\"", Ok(list{Model.String("test")})),
    ("`test`", Ok(list{Model.Identifier({identifier: "test"})})),
    //("234 `test`", Ok(list{Model.Int(234n), Model.Identifier({identifier: "test"})})),
]

test("single eval", () => {
    singleTestValues->Array.forEach(((script, result)) => {
        check(Interpreter.evalSingle(script), result)
    })
})

test("script eval", () => {
    testScripts->Array.forEach(((script, result)) => {
        check(Interpreter.evalList(script), result)
    })
})

test("string eval", () => {
    testStrings->Array.forEach(((script, result)) => {
        check(Interpreter.evalString(script), result)
    })
})
