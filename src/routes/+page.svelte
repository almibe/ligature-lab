<script lang="ts">
	import { newEngine } from "@ligature/ligature";
  import Split from "split.js";
  import { browser } from '$app/environment';

	let text: string = '';
  let result: string = "{}";
  let engine = newEngine()
	function greet(event) {
		if (event.keyCode == 13) {
      result = JSON.stringify(engine.run(text))
      text = ""
      event.preventDefault();
    }
	}

  if (browser) {
    setTimeout(() => {
      Split(['#results', '#input'], {
        direction: "vertical",
        sizes: [70, 30]
      })
     document.querySelector("#input").focus();
    })
  }
</script>
  
<div id="container">
  <section id="results">{result}</section>
  <textarea id="input" bind:value={text} on:keydown={greet}></textarea>  
</div>

<style>
  #container {
    height: 100vh;
  }

  #results {
    display: flex;
    align-items: flex-end;
    width: 100%;
    padding: 20px;
  }

  #input {
  }

  textarea {
    resize: none;
    field-sizing: content;
    width: 100%;
    height:1;
  }
</style>