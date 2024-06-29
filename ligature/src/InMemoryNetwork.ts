export const inMemoryNetwork = (initial: Set<Triple> = Set([])) => {
    const triples = initial
    return {
        triples: () => {
            return triples
        },
        contains: (triple: Triple) => {
            return triples.contains(triple)
        },
        match: (pattern: Network) => {
            throw "TODO"
        },
        merge: (network: Network) => {
            return inMemoryNetwork(Set.union([triples, network.triples()]))
        },
        minus: (network: Network) => {
            return inMemoryNetwork(triples.subtract(network.triples()))
        }
    }
}
