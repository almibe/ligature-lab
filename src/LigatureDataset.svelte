<script>
	import { createEventDispatcher, onMount } from 'svelte'
	const dispatch = createEventDispatcher()

  onMount(async () => {
      await import("../../node_modules/bootstrap/dist/js/bootstrap.esm")

      document.getElementById('loadButton').style.display = 'none'

      document.getElementById('query-tab').addEventListener('show.bs.tab', function () {
        document.getElementById('runButton').style.display = 'block'
        document.getElementById('loadButton').style.display = 'none'
      })

      document.getElementById('write-tab').addEventListener('show.bs.tab', function () {
        document.getElementById('runButton').style.display = 'none'
        document.getElementById('loadButton').style.display = 'block'
      })
  })

  let script = ""
  let output = ""
  let input = ""

  function runScript() {
  }

  function loadData() {

  }

</script>

<div class="container">
  <div class="row">
    <div class="col">
      <ul class="nav nav-tabs" id="datasetTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="query-tab" data-bs-toggle="tab" data-bs-target=".query" type="button" role="tab" aria-controls="query" aria-selected="true">Query</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="write-tab" data-bs-toggle="tab" data-bs-target=".write" type="button" role="tab" aria-controls="write" aria-selected="false">Write</button>
        </li>
      </ul>
    </div>
    <div class="col">
      <button on:click={runScript} id="runButton" type="button" class="btn btn-primary float-end">Run</button>
      <button on:click={loadData} id="loadButton" type="button" class="btn btn-primary float-end">Load</button>
    </div>
  </div>
</div>

<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active query" id="query" role="tabpanel" aria-labelledby="query-tab">
    <div class="container">
      <div class="row">
        <textarea rows="15" bind:value={script}></textarea>
      </div>
    </div>
    
    <div class="container">
      <div class="row">
        <textarea readonly rows="10" bind:value={output}></textarea>
      </div>
    </div>    
  </div>
  <div class="tab-pane fade write" id="write" role="tabpanel" aria-labelledby="write-tab">
    <div class="container">
      <div class="row">
        <textarea rows="20" bind:value={input}></textarea>
      </div>
    </div>    
  </div>
</div>

<style>
    @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
