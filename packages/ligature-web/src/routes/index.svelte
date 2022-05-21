<script>
  import "blueprint-css/dist/blueprint.css"
  import A11yDialog from 'a11y-dialog'
  import { onMount } from 'svelte';

  let datasets = [];
  let addDialog = null;
  let removeDialog = null;
  let datasetToRemove = "";

  onMount(async () => {
    const addContainer = document.querySelector('#addDatasetDialog');
    const removeContainer = document.querySelector('#removeDatasetDialog');
    addDialog = new A11yDialog(addContainer);
    removeDialog = new A11yDialog(removeContainer);
    addDialog.on('show', function(element, event) {
      document.addEventListener("keyup", addDatasetEnterKeyHandler)
      document.getElementById("datasetName").value = "";
      document.getElementById("datasetName").focus();
    })
    addDialog.on('hide', function(element) {
      document.removeEventListener("keyup", addDatasetEnterKeyHandler)
    })
    refreshDatasets();
  })

  function addDatasetEnterKeyHandler(event) {
      if (event.code === 'Enter') {
        addDataset();
      }
  }

  function removeDatasetEnterKeyHandler(event) {
    if (event.code === 'Enter') {
      removeDataset();
    }
  }

  async function addDataset() {
    let datasetName = document.getElementById("datasetName").value;
    console.log(datasetName);
    let response = await fetch(`/datasets/${datasetName}`, {method: 'POST'});
    console.log(response);
    datasets = [...datasets, datasetName];
    addDialog.hide();
  }

  async function showRemoveDataset(datasetName) {
    document.addEventListener("keyup", removeDatasetEnterKeyHandler)
    datasetToRemove = datasetName;
    removeDialog.show();
  }

  async function removeDataset() {
    document.removeEventListener("keyup", removeDatasetEnterKeyHandler)
    console.log(`in remove dataset ${datasetToRemove}`);
    let response = await fetch(`/datasets/${datasetToRemove}`, {method: 'DELETE'});
    refreshDatasets();
    removeDialog.hide();
  }

  async function refreshDatasets() {
    try {
      const response = await fetch('/datasets');
      datasets = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
</script>

<h1>Datasets</h1>
<button on:click={() => addDialog.show()}>Add Dataset</button>

<table bp="fill">
  <tr>
    <th>Dataset Name</th>
    <th>Remove?</th>
  </tr>
  {#each datasets as dataset}
    <tr>
      <td><a href="/datasets/{dataset}">{dataset}</a></td>
      <td><button on:click={() => showRemoveDataset(dataset)}>❌</button></td>
    </tr>
  {/each}
</table>

<div
  id="addDatasetDialog"
  class="dialog-container"
  aria-labelledby="addDatasetTitle"
  aria-hidden="true"
>
  <div class="dialog-overlay" data-a11y-dialog-hide></div>
  <div class="dialog-content" role="document">
    <button class="dialog-close" type="button" data-a11y-dialog-hide aria-label="Close dialog">
      &times;
    </button>
    <h1 id="addDatasetTitle">Add Dataset</h1>
    <p><label>Name: <input required name="datasetName" id="datasetName"></label></p>
    <p><input type=submit formnovalidate name="addDataset" value="Add Dataset"></p>
    <p><input type=submit formnovalidate name=cancel value="Cancel" on:click={() => addDialog.hide()}></p>
  </div>
</div>

<div
  id="removeDatasetDialog"
  class="dialog-container"
  aria-labelledby="removeDatasetTitle"
  aria-hidden="true"
>
  <div class="dialog-overlay" data-a11y-dialog-hide></div>
  <div class="dialog-content" role="document">
    <button class="dialog-close" type="button" data-a11y-dialog-hide aria-label="Close dialog">
      &times;
    </button>
    <h1 id="removeDatasetTitle">Remove {datasetToRemove}?</h1>
    <p><input type=submit formnovalidate name="addDataset" value="Yes"></p>
    <p><input formnovalidate name=cancel value="No" on:click={() => removeDialog.hide()}></p>
  </div>
</div>
