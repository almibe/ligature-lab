import { expect, test } from 'vitest'
import { Set, Map } from 'immutable'
import { Word, Slot, Triple, Value, word, slot } from './ligature.ts'
import { inMemoryNetwork, utility } from './in-memory-network.ts'

test('empty eduction', () => {
    expect(utility.extractTriple(
        Triple({}), Triple({})
    )).toEqual(Map<Slot,Value>())
})

test('basic eduction with no named slots', () => {
    expect(utility.extractTriple(
        Triple({entity: word("e"), attribute: word("a"), value: word("v")}), 
        Triple()
    )).toEqual(Map<Slot,Value>())
})

test('basic eduction with all named slots', () => {
    expect(utility.extractTriple(
        Triple({entity: word("e"), attribute: word("a"), value: word("v")}), 
        Triple({entity: slot("a"), attribute: slot("b"), value: slot("c")})
    )).toEqual(Map<Slot,Value>([
        [slot("a"), word("e")],
        [slot("b"), word("a")],
        [slot("c"), word("v")],
    ]))
})