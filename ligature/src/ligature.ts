import { Set, Record } from "immutable"

export type Identifier = { identifier: string }

export const Identifier = Record<Identifier>({ identifier: "" })

export type Slot = { name: string | undefined }

export const Slot = Record<Slot>({ name: undefined })

export type Value = bigint | string | Identifier | Uint8Array

export type Triple = { 
    entity: Identifier | Slot, 
    attribute: Identifier | Slot, 
    value: Value | Slot
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
    triples: () => Set<Triple>
    /**
     * Check if this Network contains a single Triple.
     */
    contains: (triple: Triple) => boolean
    /**
     * Get the number of Triples in this Network.
     */
    count: () => number
    /**
     * Check if this Pattern of Triple matches this Network.
     */
    match: (pattern: Network) => boolean
    /**
     * Merge two networks.
     */
    merge: (network: Network) => Network
    /**
     * Remove all of the Triples from the argument Network from this Network and return the new Network.
     */
    minus: (network: Network) => Network
    /**
     * Use this Network to fill in the passed in Pattern.
     */
    apply: (pattern: Network) => Network
    /**
     * 
     */
    query: (match: Network, trans: Network) => Network
}
