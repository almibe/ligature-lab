<script lang="ts">
    import { onMount } from "svelte";
    import { run, resultToJs } from "@ligature/ligature"


    let kbs = $state([])

    onMount(async () => {
        const script = "kbs"
        let result = await fetch("/api/", {
            method: "POST",
            body: script,
        })
        let resultText = await result.text()
        let res = resultToJs(run(resultText))
        kbs = res.value
    })
</script>

<div>
    KBs
    <ul>
        {#each kbs as kb}
            <li>{kb.value}</li>
        {/each}
    </ul>
</div>
