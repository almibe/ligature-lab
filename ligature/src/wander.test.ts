import { expect, test } from 'vitest'
import { parse } from './wander'
import { inMemoryNetwork } from './in-memory-network'

test('test tokenization', () => {
    expect(parse("{}")).toEqual([inMemoryNetwork()])
    expect(parse("hello")).toEqual([{word: "hello", arguments: []}])
})
