<script>
  import { run } from '@ligature/ligature'

  let script = ""
  let output = ""

  function runScript() {
    output = run(script)
  }
</script>

<div class="container">
  <div class="row">
    <h1>Ligature Lab</h1>
  </div>
</div>

<div class="container">
  <div class="row">
    <button on:click={runScript} type="button" class="btn btn-primary">Run</button>
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
