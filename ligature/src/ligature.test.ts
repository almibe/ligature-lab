import { expect, test } from 'vitest'
import { Set, Map } from 'immutable'
import { Identifier, Slot, Triple, Value } from './ligature.ts'
import { inMemoryNetwork } from './in-memory-network.ts'

test('inMemoryNetwork should start empty', () => {
    expect(inMemoryNetwork().write()).toEqual(Set([]))
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
    })])).write()).toEqual(Set([Triple({
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
    const res = inMemoryNetwork(left).merge(inMemoryNetwork(right)).write()
    expect(res).toEqual(inMemoryNetwork(Set([{
        entity: {identifier: "entity"},
        attribute: {identifier: "attribute"},
        value: {identifier: "value"},
    },
    {
        entity: {identifier: "entity2"},
        attribute: {identifier: "attribute"},
        value: {identifier: "value"},
    }])).write())
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
    const res = inMemoryNetwork(left).minus(inMemoryNetwork(right)).write()
    expect(res).toEqual(Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })]))
})

test('null apply', () => {
    const network = inMemoryNetwork(Set([Triple({
        entity: Identifier({identifier: "entity"}),
        attribute: Identifier({identifier: "attribute"}),
        value: Identifier({identifier: "value"}),
    })]))
    const values = Map<Slot, Value>()
    expect(network.apply(values).write()).toEqual(network.write())
})

test('full apply', () => {
    const network = inMemoryNetwork(Set([Triple({
        entity: Slot({name: "e"}),
        attribute: Slot({name: "a"}),
        value: Slot({name: "v"}),
    })]))
    const values = Map<Slot, Value>([
        [Slot({name: "e"}), Identifier({identifier: "entity"})],
        [Slot({name: "a"}), Identifier({identifier: "attribute"})],
        [Slot({name: "v"}), Identifier({identifier: "value"})],
    ])
    expect(network.apply(values).write()).toEqual(network.write())
})



// test('test match', () => {
//     const left = inMemoryNetwork(Set([Triple({
//         entity: Identifier({identifier: "entity"}),
//         attribute: Identifier({identifier: "attribute"}),
//         value: Identifier({identifier: "value"}),
//     })]))
//     const right1 = inMemoryNetwork(Set([Triple({
//         entity: Identifier({identifier: "entity"}),
//         attribute: Identifier({identifier: "attribute"}),
//         value: Identifier({identifier: "value"}),
//     })]))
//     const right2 = inMemoryNetwork(Set([Triple({
//         entity: Identifier({identifier: "entity2"}),
//         attribute: Identifier({identifier: "attribute"}),
//         value: Identifier({identifier: "value"}),
//     })]))
//     expect(left.match(right1)).toEqual(true)
//     expect(left.match(right2)).toEqual(false)
// })
