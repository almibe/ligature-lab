<script>
    import AddDatasetModal from "./modals/DatasetModal.svelte";
    import DatasetList from "./DatasetList.svelte";

    let showModal = {show: false};

    let addDataset = () => {
        showModal.show = true;
    }
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
<AddDatasetModal showModal={showModal} />
