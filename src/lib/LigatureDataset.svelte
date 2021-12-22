<script>
    //import { run } from '@ligature/ligature'
    import { run } from "../../../ligature-scala/ligature-js/js/target/scala-3.1.0/ligature-js-fastopt/main.js"
  
  
    let script = ""
    let output = ""
  
    function runScript() {
      output = run(script)
    }
  
    function addDataset() {
      //TODO show modal
      //TODO if okay then publish addDataset event
    }
  </script>
  
  <div class="container">
    <div class="row">
      <h1>Ligature Lab</h1>
    </div>
  </div>
  
  <div class="container">
    <div class="row">
      <div class="col">
        <button on:click={addDataset} type="button" class="btn btn-primary">Add Dataset</button>
      </div>  
      <div class="col">
        <button on:click={runScript} type="button" class="btn btn-primary float-end">Refresh</button>
      </div>
    </div>
  </div>
  
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
  
  <style>
      @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
  </style>
  