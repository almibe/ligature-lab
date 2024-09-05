<script lang="ts">
	import { resultStore } from "./Store";
    import ReplViewResult from "./ReplViewResult.svelte";
	import { printValue } from "$lib";

    let results = []
    
    resultStore.subscribe((newResults) => results = newResults)
</script>

<div>
{#each results as result}
    <ReplViewResult result={printValue(result)}></ReplViewResult>
{/each}
</div>
