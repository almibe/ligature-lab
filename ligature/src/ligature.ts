import { Set, Record, List } from "immutable"

export type Identifier = { identifier: string }

export const Identifier = Record<Identifier>({ identifier: "" })

export type Slot = { name: string | undefined }

export const Slot = Record<Slot>({ name: undefined })

export type Value = bigint | string | Identifier | Uint8Array

export type Triple = { 
    entity: Identifier, 
    attribute: Identifier, 
    value: Value 
}

export const Triple = Record<Triple>({
    entity: Identifier(),
    attribute: Identifier(),
    value: Identifier()
})

export type PatternTriple = {
    entity: Identifier | Slot,
    attribte: Identifier | Slot,
    value: Value | Slot
}

export const Pattern = Record<PatternTriple>({
    entity: Slot(),
    attribte: Slot(),
    value: Slot()
})

export type Pattern = List<Record<PatternTriple>>

export interface Network {
    statements: () => Set<Triple>
    match: (pattern: Pattern | Triple) => boolean
    merge: (network: Network) => Network
    minus: (network: Network) => Network
}

export const inMemoryNetwork = (initial: Set<Triple> = Set([])) => {
    const statements = initial
    return {
        statements: () => {
            return statements
        },
        match: (pattern: Pattern | Triple) => {
            if (Array.isArray(pattern)) {
                throw "TODO"
            } else {
                console.log("in match", pattern, statements.toArray(), statements.contains(pattern as Triple))
                return statements.contains(pattern as Triple)
            }
        },
        merge: (network: Network) => {
            return inMemoryNetwork(Set.union([statements, network.statements()]))
        },
        minus: (network: Network) => {
            return inMemoryNetwork(statements.subtract(network.statements()))
        }
    }
}
