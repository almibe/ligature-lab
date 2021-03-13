<script>
    import AddDatasetModal from "./modals/DatasetModal.svelte";
    import DatasetList from "./DatasetList.svelte";
    import { onMount } from "svelte";

    let addDataset = () => {}

    onMount(async () => {
        let bs = await import("../../node_modules/bootstrap/dist/js/bootstrap.bundle");
    	let myModal = new bs.Modal(document.getElementById('newDatasetModal'), {});

        addDataset = () => {
            document.getElementById('datasetName').value = '';
            document.getElementById('datasetUrl').value = '';
            document.getElementById('ligatureEndpoint').checked = false;
            document.getElementById('sparqlEndpoint').checked = false;
	        myModal.show()
        }
    })
</script>

<div class="row">
    <div class="col-sm-auto">
        <h2>Datasets</h2>
    </div>
    <div class="col-sm">
        <button type="button" class="btn btn-outline-dark" id="newDataset" on:click={addDataset}>Add Dataset</button>
    </div>
</div>

<DatasetList />
<AddDatasetModal />
