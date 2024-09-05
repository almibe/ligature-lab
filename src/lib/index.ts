export function printValue(value) {
    if (!value) {
        return "--"
    } else if (value.identifier) {
        return value.identifier
    } else if (value.slot) {
        return "$" + value.slot
    } else if (value.networkName) {
        return "@" + value.networkName
    } else if (value.int) {
        return value.int
    } else if (typeof value.string === "string") {
        return JSON.stringify(value.string)
    } else if (value.network) {
        return printNetwork(value)
    } else if (value.quote) {
        return printQuote(value)
    }else {
        return "--"
    }
}

export function printQuote(quote) {
    console.log(quote)
    let result = "["
    quote.quote.forEach(value => {
        result = result + " " + printValue(value)
    })
    result = result + " ]"
    return result;
}

export function printNetwork(network) {
    const indentation = "  "
    let result = "{\n"
    network.network.forEach(statement => {
        console.log(statement)
                result = result + indentation + printValue(statement[0]) + " " + printValue(statement[1]) + " " + printValue(statement[2]) + "\n"
            })
    result = result + "}\n"
    return result;
}
