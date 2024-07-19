@module("vitest") external test: (string, _ => _) => unit = "test"

let check = (left, right) => %raw(`Vitest.expect(left).toStrictEqual(right)`)

let testValues: array<(Wander.wanderValue, result<list<Wander.wanderValue>, string>)> = [
    (Wander.Int(123n), Ok(list{Wander.Int(123n)})),
]

test("basic tokenization", () => {
    testValues->Array.forEach(((script, result)) => {
        check(Interpreter.eval(script), result)
    })
})
