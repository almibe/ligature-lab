<script>
import AddDatasetModal from "./AddDatasetModal.svelte";
import DatasetList from "./DatasetList.svelte";

function addDataset() {
    //TODO toggle is-active class on AddDatasetModal
}
</script>

<div class="columns is-vcentered">
    <div class="column is-narrow">
        <h2 class="title is-4 is-pulled-left ">Datasets</h2>
    </div>
    <div class="column">
        <button class="button" on:click={addDataset}>Add Dataset</button>
    </div>
</div>

<DatasetList />
<AddDatasetModal />