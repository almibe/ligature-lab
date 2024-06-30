import { expect, test } from 'vitest'
import { Set, Map } from 'immutable'
import { Identifier, Slot, Triple, Value, identifier, slot } from './ligature.ts'
import { inMemoryNetwork, utility } from './in-memory-network.ts'

test('empty eduction', () => {
    expect(utility.extractTriple(
        Triple({}), Triple({})
    )).toEqual(Map<Slot,Value>())
})

test('basic eduction with no named slots', () => {
    expect(utility.extractTriple(
        Triple({entity: identifier("e"), attribute: identifier("a"), value: identifier("v")}), 
        Triple()
    )).toEqual(Map<Slot,Value>())
})

test('basic eduction with all named slots', () => {
    expect(utility.extractTriple(
        Triple({entity: identifier("e"), attribute: identifier("a"), value: identifier("v")}), 
        Triple({entity: slot("a"), attribute: slot("b"), value: slot("c")})
    )).toEqual(Map<Slot,Value>([
        [slot("a"), identifier("e")],
        [slot("b"), identifier("a")],
        [slot("c"), identifier("v")],
    ]))
})
