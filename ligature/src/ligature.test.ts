import { expect, test } from 'vitest'
import { Set, Map } from 'immutable'
import { Word, Slot, Triple, Value } from './ligature.ts'
import { inMemoryNetwork } from './in-memory-network.ts'

test('inMemoryNetwork should start empty', () => {
    expect(inMemoryNetwork().write()).toEqual(Set([]))
})

test('inMemeoryNetworks with initial values', () => {
    expect(inMemoryNetwork(Set([Triple({
        entity: Word({word: "entity"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
    }), Triple({
        entity: Word({word: "entity"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"})
    })])).write()).toEqual(Set([Triple({
        entity: Word({word: "entity"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
    })]))
})

test('test merge', () => {
    const left = Set([{
        entity: {word: "entity"},
        attribute: {word: "attribute"},
        value: {word: "value"},
    }])
    const right = Set([{
        entity: {word: "entity2"},
        attribute: {word: "attribute"},
        value: {word: "value"},
    }])
    const res = inMemoryNetwork(left).merge(inMemoryNetwork(right)).write()
    expect(res).toEqual(inMemoryNetwork(Set([{
        entity: {word: "entity"},
        attribute: {word: "attribute"},
        value: {word: "value"},
    },
    {
        entity: {word: "entity2"},
        attribute: {word: "attribute"},
        value: {word: "value"},
    }])).write())
})

test('test minus', () => {
    const left = Set([Triple({
        entity: Word({word: "entity"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
    }), Triple({
        entity: Word({word: "entity2"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
    })])
    const right = Set([Triple({
        entity: Word({word: "entity2"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
    })])
    const res = inMemoryNetwork(left).minus(inMemoryNetwork(right)).write()
    expect(res).toEqual(Set([Triple({
        entity: Word({word: "entity"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
    })]))
})

test('null apply', () => {
    const network = inMemoryNetwork(Set([Triple({
        entity: Word({word: "entity"}),
        attribute: Word({word: "attribute"}),
        value: Word({word: "value"}),
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
        [Slot({name: "e"}), Word({word: "entity"})],
        [Slot({name: "a"}), Word({word: "attribute"})],
        [Slot({name: "v"}), Word({word: "value"})],
    ])
    expect(network.apply(values).write()).toEqual(network.write())
})



// test('test match', () => {
//     const left = inMemoryNetwork(Set([Triple({
//         entity: Word({word: "entity"}),
//         attribute: Word({word: "attribute"}),
//         value: Word({word: "value"}),
//     })]))
//     const right1 = inMemoryNetwork(Set([Triple({
//         entity: Word({word: "entity"}),
//         attribute: Word({word: "attribute"}),
//         value: Word({word: "value"}),
//     })]))
//     const right2 = inMemoryNetwork(Set([Triple({
//         entity: Word({word: "entity2"}),
//         attribute: Word({word: "attribute"}),
//         value: Word({word: "value"}),
//     })]))
//     expect(left.match(right1)).toEqual(true)
//     expect(left.match(right2)).toEqual(false)
// })