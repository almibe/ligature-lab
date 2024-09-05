<script lang="ts">
	import ValueTextDisplay from "./ValueTextDisplay.svelte";
    export let result = ""
</script>

<div class="result">
<sl-alert variant="primary" open class="alert">
    <ValueTextDisplay value={result}></ValueTextDisplay>
</sl-alert>
</div>

<style>
.result {
    padding: 20px;
}
</style>