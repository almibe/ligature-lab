<script lang="typescript">
    import { store, Dataset } from "../store/store";
    import RemoveDatasetModal from "./modals/RemoveDatasetModal.svelte";

    let datasets: Array<Dataset>;
    let modalState = {show: false, dataset: null};

    const unsubscribe = store.subscribe(value => {
        datasets = value.datasets;
    });

    function removeDataset(dataset: Dataset) {
        modalState.dataset = dataset;
        modalState.show = true;
    }
</script>

<table class="table table-striped table-hover">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Endpoint</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        { #each datasets as dataset }
        <tr>
            <td class="pt-4">{dataset.name}</td>
            <td class="pt-4">{dataset.type}</td>
            <td class="pt-4">{dataset.url}</td>
            <td>
                <button type="button" class="btn btn-outline-dark">Edit</button>
                <button type="button" class="btn btn-outline-danger" on:click={() => removeDataset(dataset)}>Remove</button>
            </td>
        </tr>
        { /each }
    </tbody>
</table>

<RemoveDatasetModal modalState={modalState} />
