<script lang="ts">
    import LigatureInstance from '$lib/LigatureInstance.svelte'
    import LigatureDataset from '$lib/LigatureDataset.svelte'
    let testDatasets = ["hello", "world"]
</script>

<LigatureInstance 
    datasets={testDatasets} 
    on:refreshDatasets={event => console.log("Refresh Datasets")}
    on:addDataset={event => console.log("Adding Dataset - " + event.detail.name)}
    on:removeDataset={event => console.log("Removing Dataset - " + event.detail.name)}>
</LigatureInstance>

<hr />

<LigatureDataset></LigatureDataset>
