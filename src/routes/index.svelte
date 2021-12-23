<script lang="ts">
    import LigatureInstance from '$lib/LigatureInstance.svelte'
    import LigatureDataset from '$lib/LigatureDataset.svelte'

    let testDatasets = ["hello", "world"]


</script>

<LigatureInstance datasets={testDatasets} on:refreshDatasets={event => alert("Refresh Datasets")}></LigatureInstance>

<hr />

<LigatureDataset></LigatureDataset>
