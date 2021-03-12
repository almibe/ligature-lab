<script>
    import AddDatasetModal from "./AddDatasetModal.svelte";
    import DatasetList from "./DatasetList.svelte";
</script>

<div class="row">
    <div class="col-sm-auto">
        <h2>Datasets</h2>
    </div>
    <div class="col-sm">
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#newDatasetModal">Add Dataset</button>
    </div>
</div>

<DatasetList />
<AddDatasetModal />
