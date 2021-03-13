<script lang="typescript">
    import { onMount } from 'svelte';

    let addDataset = () => {}

    $: {
        if (showModal.show) {
            addDataset()
        }
    }

    let myModal;

    onMount(async () => {
        let bs = await import("../../../node_modules/bootstrap/dist/js/bootstrap.bundle");
        let modalEl = document.getElementById('newDatasetModal');
    	myModal = new bs.Modal(modalEl, {});

        addDataset = () => {
            document.getElementById('datasetName').value = '';
            document.getElementById('datasetUrl').value = '';
            document.getElementById('ligatureEndpoint').checked = false;
            document.getElementById('sparqlEndpoint').checked = false;
	        myModal.show()
            showModal.show = true;
        }

        modalEl.addEventListener('hide.bs.modal', function (event) {
            showModal.show = false;
        })

        //handle focus
        var modal = document.getElementById('newDatasetModal');
        var datasetName = document.getElementById('datasetName');

        modal.addEventListener('shown.bs.modal', function () {
            datasetName.focus()
        });
    })

    export let showModal;

    let datasetName: String;
    let datasetUrl: String;
    let datasetType: "Ligature" | "Sparql";

    function addNewDataset() {

    }

    function cancel() {
        myModal.hide();
    }
</script>

<div class="modal fade" id="newDatasetModal" tabindex="-1" aria-labelledby="newDatasetModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="newDatasetModalLabel">Add New Dataset</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="field">
                    <label for="datasetName" class="label">Name</label>
                    <div class="control">
                        <input id="datasetName" class="input" type="text">
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="ligatureEndpoint" id="ligatureEndpoint">
                            Ligature Endpoint
                        </label>
                        <label class="radio">
                            <input type="radio" name="sparqlEndpoint" id="sparqlEndpoint">
                            SPARQL Endpoint
                        </label>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="datasetUrl">URL</label>
                    <div class="control">
                        <input class="input" type="text" id="datasetUrl">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="control">
                    <button class="btn btn-outline-dark" on:click={addNewDataset}>Add</button>
                </div>
                <div class="control">
                    <button class="btn btn-outline-danger" on:click={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
