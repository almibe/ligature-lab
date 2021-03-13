<script lang="typescript">
    import { onMount } from 'svelte';
    import { store } from "../../store/store";

    let addDataset = () => {}
    export let errorMessages = [];

    $: {
        if (showModal.show) {
            addDataset()
        }
    }

    let newDatasetModal;

    onMount(async () => {
        let bs = await import("../../../node_modules/bootstrap/dist/js/bootstrap.bundle");
        let modalEl = document.getElementById('newDatasetModal');
    	newDatasetModal = new bs.Modal(modalEl, {});

        addDataset = () => {
            document.getElementById('datasetName').value = '';
            document.getElementById('datasetUrl').value = '';
            document.getElementById('ligatureEndpoint').checked = false;
            document.getElementById('sparqlEndpoint').checked = false;
	        newDatasetModal.show()
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

    function addNewDataset() {
        let name = document.getElementById('datasetName').value;
        let url = document.getElementById('datasetUrl').value;
        let ligatureEndpoint = document.getElementById('ligatureEndpoint').checked;
        let sparqlEndpoint = document.getElementById('sparqlEndpoint').checked;
        let type: "Ligature" | "SPARQL"
        let valid = true;

        if (name.trim().length == 0) {
            errorMessages.concat("Name is required.");
            errorMessages = errorMessages;
            valid = false;
        }

        if (ligatureEndpoint) {
            type = "Ligature";
        } else if (sparqlEndpoint) {
            type = "SPARQL";
        } else {
            errorMessages.concat("Must set Endpoint tpye.");
            errorMessages = errorMessages;
            valid = false;
        }

        if (url.trim().length == 0) { //todo just check if URL is valid
            errorMessages.concat("URL is required.");
            errorMessages = errorMessages;
            valid = false;
        }

        if (valid) {
            store.addDataset({name: name, url: url, type: type})
            newDatasetModal.hide()
        } else {
            //TODO show error message
        }
    }

    function cancel() {
        newDatasetModal.hide();
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
                            <input type="radio" name="endpoint" id="ligatureEndpoint">
                            Ligature Endpoint
                        </label>
                        <label class="radio">
                            <input type="radio" name="endpoint" id="sparqlEndpoint">
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
            {#if errorMessages.length > 0}
            <div class="alert alert-danger" role="alert">
                <ul>
                    {#each errorMessages as errorMessage}
                        <li>{errorMessage}</li>
                    {/each}
                </ul>
            </div>
            {/if}
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
