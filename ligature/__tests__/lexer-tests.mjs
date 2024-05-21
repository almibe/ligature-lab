import test from 'ava';
import { read } from '../src/Reader.res.js'
import { write } from '../src/Writer.res.js'
import { tokenize } from '../src/Tokenizer.res.js';

test('read braces', t => {
	let res = tokenize('{}')
	let expected =  {
		   TAG: 'Ok',
		   _0: [
		     {
		       tokenType: 'OpenBrace',
		       value: '{',
		     },
		   ],
		  }
	t.deepEqual(res, expected)
})

// test('read ints', async t => {
// 	const bar = Promise.resolve('bar');
// 	t.is(await bar, 'bar');
// });

//read strings

//read bytes

//read identifiers

//read square brackets
