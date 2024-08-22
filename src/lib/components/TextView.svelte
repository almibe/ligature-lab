<script lang="ts">
    import { state } from "$lib/stores";
    import { printNetwork } from "@ligature/ligature";

    let result = "{}"

    state.subscribe((value) => {
        if (value) {
            result = printNetwork(value)
        }
	});
</script>

<div>
    {result}
</div>
