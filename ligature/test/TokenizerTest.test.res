@module("vitest") external test: (string, _ => _) => unit = "test"

let check = (left, right) => %raw(`Vitest.expect(left).toStrictEqual(right)`)

let testValues: array<(string, result<array<Tokenizer.token>, string>)> = [
    (",", Ok([Tokenizer.Comma])),
    ("234", Ok([Tokenizer.Int(234n)])),
    ("\"hello\"", Ok([Tokenizer.String("hello")])),
    ("`test`", Ok([Tokenizer.Identifier("test")])),
    ("1 \"hello\" `test`", Ok([Tokenizer.Int(1n), Tokenizer.String("hello"), Tokenizer.Identifier("test")])),
    ("{}", Ok([Tokenizer.OpenBrace, Tokenizer.CloseBrace])),
    ("word", Ok([Tokenizer.Word("word")])),
    ("[]", Ok([Tokenizer.OpenSquare, Tokenizer.CloseSquare]))
]

test("basic tokenization", () => {
    testValues->Array.forEach(((script, result)) => {
        check(Tokenizer.tokenize(script), result)
    })
})
