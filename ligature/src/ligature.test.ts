import { expect, test } from 'vitest'
import { Identifier, Triple, inMemoryNetwork } from './Ligature'
import { Set } from 'immutable'

test('inMemoryNetwork should start empty', () => {
    expect(inMemoryNetwork().triples()).toEqual(Set([]))
})

test('inMemeoryNetworks with initial values', () => {
    expect(inMemoryNetwork(Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    }), Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"})
    })])).triples()).toEqual(Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })]))
})

test('test merge', () => {
    const left = Set([{
        entity: {identifier: "entity"},
        attribute: {identifier: "attribute"},
        value: {identifier: "value"},
    }])
    const right = Set([{
        entity: {identifier: "entity2"},
        attribute: {identifier: "attribute"},
        value: {identifier: "value"},
    }])
    const res = inMemoryNetwork(left).merge(inMemoryNetwork(right)).triples()
    expect(res).toEqual(inMemoryNetwork(Set([{
        entity: {identifier: "entity"},
        attribute: {identifier: "attribute"},
        value: {identifier: "value"},
    },
    {
        entity: {identifier: "entity2"},
        attribute: {identifier: "attribute"},
        value: {identifier: "value"},
    }])).triples())
})

test('test match', () => {
    const left = inMemoryNetwork(Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })]))
    const right1 = Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })
    const right2 = Triple({
        entity: Identifier({identifier: "entity2"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })
    expect(left.match(right1)).toBe(true)
    expect(left.match(right2)).toBe(false)
})

test('test minus', () => {
    const left = Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    }), Triple({
        entity: Identifier({identifier: "entity2"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })])
    const right = Set([Triple({
        entity: Identifier({identifier: "entity2"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })])
    const res = inMemoryNetwork(left).minus(inMemoryNetwork(right)).triples()
    expect(res).toEqual(Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })]))
})
