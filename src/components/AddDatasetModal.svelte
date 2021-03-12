<script lang="typescript">
  import { onMount } from 'svelte';

  onMount(() => {
    var modal = document.getElementById('newDatasetModal');
    var datasetName = document.getElementById('datasetName');

    modal.addEventListener('shown.bs.modal', function () {
      datasetName.focus()
    });
  })
</script>

<div class="modal" id="newDatasetModal" tabindex="-1">
    <div class="modal-dialog"></div>
    <div class="modal-content">
      <div class="modal-header">
        Add New Dataset
      </div>
        <div class="modal-body">
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input id="datasetName" class="input" type="text" placeholder="Text input">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" name="question">
                Ligature Endpoint
              </label>
              <label class="radio">
                <input type="radio" name="question">
                SPARQL Endpoint
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">URL</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input">
            </div>
          </div>
          
          
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Save</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
</div>
