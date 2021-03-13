<script lang="typescript">
    import { onMount } from 'svelte';

    let datasetName: String;
    let datasetUrl: String;
    let datasetType: "Ligature" | "Sparql";

    onMount(() => {
        var modal = document.getElementById('newDatasetModal');
        var datasetName = document.getElementById('datasetName');

        modal.addEventListener('shown.bs.modal', function () {
            datasetName.focus()
        });
    })
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
                    <button class="btn btn-outline-dark">Add</button>
                </div>
                <div class="control">
                    <button class="btn btn-outline-danger">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
