import { expect, test } from 'vitest'
import { runWander } from '../src/Interpreter.res.js'

const testScripts = [
    ["234", {"TAG": "Ok", "_0": [{"TAG": "Int", "_0": 234n}]}],
    //['"hello"', {}],
    ['`test`', {"TAG": "Ok", "_0": [{"TAG": "Identifier", "_0": "test"}]}],
]

test('iunterpret basic values', x => {
    testScripts.forEach((value) => {
        expect(runWander(value[0])).toStrictEqual(value[1])
    })
})