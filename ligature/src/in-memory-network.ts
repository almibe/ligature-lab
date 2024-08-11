import { Map, Set } from "immutable"
import { Statement, Network, Slot, Value, Word } from "./ligature.ts"

const isSlot = (value: any): boolean => value.name !== undefined

export const utility = {
    extractStatement: (statement: Statement, patternStatement: Statement): null | Map<Slot, Value> => {
        var result = Map<Slot, Value>()

        console.log(JSON.stringify(patternStatement))

        if (isSlot(patternStatement.entity)) {
            const slot = patternStatement.entity as Slot
            if (slot.name != null) {
                result = result.set(slot, statement.entity)
            }
        } else if (statement.entity != patternStatement.entity) {
            return null
        }
    
        if (isSlot(patternStatement.attribute)) {
            const slot = patternStatement.attribute as Slot
            if (slot.name != null) {
                result = result.set(slot, statement.attribute)
            }
        } else if (statement.attribute != patternStatement.attribute) {
            return null
        }
    
        if (isSlot(patternStatement.value)) {
            const slot = patternStatement.value as Slot
            if (slot.name != null) {
                result = result.set(slot, statement.value)
            }
        } else if (statement.value != patternStatement.value ) {
            return null
        }

        return result
    },
    
    /**
     * A utility function that 
     */
    extractNetwork: (statements: Set<Statement>, pattern: Network): null | Set<Map<Slot, Value>> => {
        var results = Set<Map<Slot, Value>>();
        statements.forEach((statement) => {
    
        })
        return results
    }    
}

export const inMemoryNetwork = (initial: Set<Statement> = Set([])) => {
    const statements = initial
    return {
        write: () => {
            return statements
        },
        count: () => {
            return statements.size
        },
        merge: (network: Network) => {
            return inMemoryNetwork(Set.union([statements, network.write()]))
        },
        minus: (network: Network) => {
            return inMemoryNetwork(statements.subtract(network.write()))
        },
        apply: (values: Map<Slot, Value>) => {
            return inMemoryNetwork(statements.map((statement) => {
                var entity: Word | Slot = statement.entity
                if (isSlot(statement.entity)) {
                    let slotName = (statement.entity as Slot)
                    if (values.contains(slotName)) {
                        entity = (values.get(slotName) as Word | Slot)
                    }
                }
                var attribute: Word | Slot = statement.attribute
                if (isSlot(statement.attribute)) {
                    let slotName = (statement.attribute as Slot)
                    if (values.contains(slotName)) {
                        attribute = (values.get(slotName) as Word | Slot)
                    }
                }
                var value: Value = statement.value
                if (isSlot(statement.value)) {
                    let slotName = (statement.value as Slot)
                    if (values.contains(slotName)) {
                        value = (values.get(slotName) as Value)
                    }
                }
                return Statement({entity, attribute, value})
            }))
        },
        match: (pattern: Network): boolean => {
            return utility.extractNetwork(statements, pattern) != null
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