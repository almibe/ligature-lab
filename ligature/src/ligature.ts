import { Set, Record, Map } from "immutable"

export type Identifier = { identifier: string }

export const Identifier = Record<Identifier>({ identifier: "" })

export const identifier = (identifier: string) => Identifier({identifier})

export type Slot = { name: string | null }

export const Slot = Record<Slot>({ name: null })

export const slot = (name: string) => Slot({name})

export type Value = bigint | string | Identifier | Uint8Array | Slot

export type Triple = { 
    entity: Identifier | Slot, 
    attribute: Identifier | Slot, 
    value: Value
}

export const Triple = Record<Triple>({
    entity: Slot(),
    attribute: Slot(),
    value: Slot()
})

export interface Network {
    /**
     * Get all of the Triples in this Network.
     */
    write: () => Set<Triple>
    /**
     * Get the number of Triples in this Network.
     */
    count: () => number
    /**
     * Merge two networks.
     */
    merge: (network: Network) => Network
    /**
     * Remove all of the Triples from the argument Network from this Network and return the new Network.
     */
    minus: (network: Network) => Network
    /**
     * Insert the given values into the Network and return the new Network.
     */
    apply: (values: Map<Slot, Value>) => Network
    /**
     * Check if this Pattern of Triple matches this Network.
     */
    match: (pattern: Network) => boolean
    /**
     * Find all instances of the given pattern and extract the matching values.
     */
    educe: (pattern: Network) => Set<Map<Slot, Value>>
    /**
     * Select Subnetworks using match, apply 
     */
    query: (match: Network, trans: Network) => Network
    /**
     * Perform a query and merge the results back into the original Network.
     */
    infer: (match: Network, trans: Network) => Network
}