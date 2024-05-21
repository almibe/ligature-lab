import test from 'ava';
import { read } from '../src/Reader.res.js'
import { write } from '../src/Writer.res.js'

function readWriteTest(value, t) {
    let res = write(read(value))
    t.deepEqual(res, value)
}

test('read and write empty network', t => {
    readWriteTest('{}', t)
})
