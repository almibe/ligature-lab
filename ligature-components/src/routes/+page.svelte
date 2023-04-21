<script lang="ts">
    import Ligature from '../lib/Ligature.svelte';
    let results: Array<string> = [];
    async function runQuery(event: {detail: string}) {
        const res = await fetch('/wander', {
            method: "POST",
            body: event.detail
        })
        results = [await res.text(), ...results];
    }

    function clear() {
        results = [];
    }
</script>

<Ligature {results} on:runQuery={runQuery} on:clear={clear}></Ligature>
