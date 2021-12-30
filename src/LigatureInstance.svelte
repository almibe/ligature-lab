<script>
	import { createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()

    export let datasets = []

    let datasetToRemove = ""
    let datasetToAdd = ""

    onMount(async () => {
        await import("../../node_modules/bootstrap/dist/js/bootstrap.esm")

        document.getElementById('addDatasetModal').addEventListener('show.bs.modal', function () {
            datasetToAdd = ""
        })

        document.getElementById('addDatasetModal').addEventListener('shown.bs.modal', function () {
            document.getElementById('datasetName').focus()  
        })
    })

    function addDataset(name) {
        dispatch('addDataset', {name})
    }

    function removeDataset(name) {
        dispatch('removeDataset', {name})
    }

    function refreshDatasets() {
        dispatch('refreshDatasets')
    }
</script>
  
<div class="container">
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDatasetModal">
                Add Dataset
            </button>            
        </div>  
        <div class="col">
            <button on:click={refreshDatasets} type="button" class="btn btn-primary float-end">Refresh</button>
        </div>
    </div>

    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Dataset Name</th>
                    <th scope="col">Remove?</th>
                </tr>
            </thead>
            <tbody>
                {#each datasets as dataset}
                    <tr>
                        <td>
                            {dataset}
                        </td>
                        <td>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#removeDatasetModal" on:click={e => datasetToRemove = dataset}>Remove</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<div class="modal fade" id="addDatasetModal" tabindex="-1" aria-labelledby="addDatasetModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addDatasetModalLabel">Add Dataset</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="field">
                    <label for="datasetName" class="label">Name</label>
                    <div class="control">
                        <input id="datasetName" class="input" type="text" bind:value={datasetToAdd}>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={e => addDataset(datasetToAdd)}>Add Dataset</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="removeDatasetModal" tabindex="-1" aria-labelledby="removeDatasetModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="removeDatasetModalLabel">Remove Dataset</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Remove {datasetToRemove}?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={e => removeDataset(datasetToRemove)}>Remove</button>
            </div>
        </div>
    </div>
</div>  

<style>
    @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
