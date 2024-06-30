import { Map, Set } from "immutable"
import { Triple, Network, Slot, Value, Identifier } from "./ligature.ts"

const isSlot = (value: any): boolean => value.name !== undefined

export const utility = {
    extractTriple: (triple: Triple, patternTriple: Triple): null | Map<Slot, Value> => {
        var result = Map<Slot, Value>()

        console.log(JSON.stringify(patternTriple))

        if (isSlot(patternTriple.entity)) {
            const slot = patternTriple.entity as Slot
            if (slot.name != null) {
                result = result.set(slot, triple.entity)
            }
        } else if (triple.entity != patternTriple.entity) {
            return null
        }
    
        if (isSlot(patternTriple.attribute)) {
            const slot = patternTriple.attribute as Slot
            if (slot.name != null) {
                result = result.set(slot, triple.attribute)
            }
        } else if (triple.attribute != patternTriple.attribute) {
            return null
        }
    
        if (isSlot(patternTriple.value)) {
            const slot = patternTriple.value as Slot
            if (slot.name != null) {
                result = result.set(slot, triple.value)
            }
        } else if (triple.value != patternTriple.value ) {
            return null
        }

        return result
    },
    
    /**
     * A utility function that 
     */
    extractNetwork: (triples: Set<Triple>, pattern: Network): null | Set<Map<Slot, Value>> => {
        var results = Set<Map<Slot, Value>>();
        triples.forEach((triple) => {
    
        })
        return results
    }    
}

export const inMemoryNetwork = (initial: Set<Triple> = Set([])) => {
    const triples = initial
    return {
        write: () => {
            return triples
        },
        count: () => {
            return triples.size
        },
        merge: (network: Network) => {
            return inMemoryNetwork(Set.union([triples, network.write()]))
        },
        minus: (network: Network) => {
            return inMemoryNetwork(triples.subtract(network.write()))
        },
        apply: (values: Map<Slot, Value>) => {
            return inMemoryNetwork(triples.map((triple) => {
                var entity: Identifier | Slot = triple.entity
                if (isSlot(triple.entity)) {
                    let slotName = (triple.entity as Slot)
                    if (values.contains(slotName)) {
                        entity = (values.get(slotName) as Identifier | Slot)
                    }
                }
                var attribute: Identifier | Slot = triple.attribute
                if (isSlot(triple.attribute)) {
                    let slotName = (triple.attribute as Slot)
                    if (values.contains(slotName)) {
                        attribute = (values.get(slotName) as Identifier | Slot)
                    }
                }
                var value: Value = triple.value
                if (isSlot(triple.value)) {
                    let slotName = (triple.value as Slot)
                    if (values.contains(slotName)) {
                        value = (values.get(slotName) as Value)
                    }
                }
                return Triple({entity, attribute, value})
            }))
        },
        match: (pattern: Network): boolean => {
            return utility.extractNetwork(triples, pattern) != null
        },
        educe: (pattern: Network): Set<Map<Slot, Value>> => {
            
            throw "TODO"
        },
        query: (pattern: Network, trans: Network) => {
            
            throw "TODO"
        },
        infer: (pattern: Network, trans: Network) => {

            throw "TODO"
        }
    }
}
