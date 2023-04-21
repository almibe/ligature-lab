<script lang="ts">
    import "bulma/css/bulma.css";
    export let results: Array<string>;
</script>

<ul>
    {#each results as resultText}
        <div class="resultText"><pre>{resultText}</pre></div>
    {/each}
</ul>

<style>
    .resultText {
        padding-top: 2em;
    }
</style>
