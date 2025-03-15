<script lang="ts">
    import { onMount } from "svelte";
    import { runScript } from "@ligature/ligature-components"

    onMount(async () => {
        const script = "{display table network (docs)}"
        let result = await fetch("/api/", {
            method: "POST",
            body: script,
        })
        let resultText = await result.text()
        runScript(resultText, document.getElementById("docs"))
    })
</script>

<div>
    <div id="docs"></div>
</div>
