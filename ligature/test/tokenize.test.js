import { expect, test } from 'vitest'
import { tokenize } from '../src/Tokenizer.res.js'

const testValues = [
    [",", {"TAG": "Ok", "_0": ["Comma"]}],
    ["234", {"TAG": "Ok", "_0": [{"TAG": "Int", "_0": 234n}]}],
    //['"hello"', {}],
    ['`test`', {"TAG": "Ok", "_0": [{"TAG": "Identifier", "_0": "test"}]}],
]

test('basic tokenization', x => {
    testValues.forEach((value) => {
        expect(tokenize(value[0])).toStrictEqual(value[1])
    })
})