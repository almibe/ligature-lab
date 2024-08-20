<script lang="ts">
	import { newEngine } from "@ligature/ligature";
  import { browser } from '$app/environment';
  import { wsConnect } from '$lib'

	let text: string = '';
  let result: string = "@ {}";
  let engine = newEngine()

  let wsEngine: undefined | any = undefined

	function checkInput(event) {
		if (event.keyCode == 13) {
      wsEngine.run(text)
      // result = JSON.stringify(engine.run(text))
      text = ""
      event.preventDefault();
    }
	}

  if (browser) {
    wsEngine = wsConnect("ws://localhost:8080/websocket")
    wsEngine.addListener((cbResult) => result = cbResult)

    document.querySelector("#input").focus();
  }
</script>

<div id="container">
  <div id="input">
    <textarea  bind:value={text} on:keydown={checkInput}></textarea>  
  </div>
  <section id="results">{result}</section>
</div>

<style>
  #container {
  }

  #results {
    padding: 20px;
  }

  #input {
  }

  textarea {
    resize: vertical;
    field-sizing: content;
    width: 100%;
    height:1;
  }
</style>