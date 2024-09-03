<script lang="ts">
    import { getContext } from "svelte";
    let engine = getContext("engine")
    let result = ""

    let printValue = (value) => {
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

    let printQuote = (quote) => {
        console.log(quote)
        let result = "["
        quote.quote.forEach(value => {
            result = result + " " + printValue(value)
        })
        result = result + " ]"
        return result;
    }

    let printNetwork = (network) => {
        const indentation = "  "
        let result = "{\n"
        network.network.forEach(statement => {
            console.log(statement)
                    result = result + indentation + printValue(statement[0]) + " " + printValue(statement[1]) + " " + printValue(statement[2]) + "\n"
                })
        result = result + "}\n"
        return result;
    }

    engine.addListener((state) => {
        if (state.name != undefined) {
            result = ""
            result = "Partial Result = " + printValue(state.partialResult) + "\n";
            result = result + "Current Network = @" + state.name + "\n"
            state.networks.forEach(network => {
                result = result + "@" + network.name + " "
                result = result + printNetwork(network)
            })
        } else {
            result = state.UserMessage
        }
	});
</script>

<div>
<pre>
{result}
</pre>
</div>
