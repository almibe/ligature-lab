<script lang="ts">
    import { getContext } from "svelte";
    let engine = getContext("engine")
    let result = ""

    let printValue = (value) => {
        if (value.identifier) {
            return value.identifier
        } else if (value.slot) {
            return "$" + value.slot
        } else if (value.networkName) {
            return "@" + value.networkName
        } else if (value.int) {
            return value.int
        } else if (value.string) {
            return JSON.stringify(value.string)
        } else {
            return "Unset"
        }
    }

    engine.addListener((state, partialResult) => {
        if (state.name != undefined) {
            result = ""
            result = "Partial Result = " + printValue(partialResult) + "\n";
            result = result + "Current Network = @" + state.name + "\n"
            state.networks.forEach(network => {
                result = result + "  @" + network.name + "\n"
                network.network.forEach(statement => {
                    result = result + "    " + printValue(statement[0]) + " " + printValue(statement[1]) + " " + printValue(statement[2]) + "\n"
                })
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
