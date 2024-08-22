<script lang="ts">
  import { initializeEditor } from "./LigatureEditor.ts"
  import { browser } from '$app/environment'
  import { state } from "$lib/stores.js";
  import { getContext } from "svelte";
	import { printNetwork } from "@ligature/ligature";

  if (browser) {
    let engine = getContext("engine")
    setTimeout(() => {
      initializeEditor({
        engine: engine,
        element: document.querySelector("#editor"),
        onRun: (text: string) => {
          state.set(engine.run(text))
        },
        onChange: (text: string) => {}
      })
    })
  }
</script>

<div id="editor"></div>
