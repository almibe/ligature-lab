<script lang="ts">
  import { initializeEditor } from "./LigatureEditor.ts"
  import { browser } from '$app/environment'
  import { getContext } from "svelte";

  if (browser) {
    import("@shoelace-style/shoelace/dist/shoelace.js")
    import("@shoelace-style/shoelace/dist/components/button/button.js")
    import("@shoelace-style/shoelace/dist/components/radio/radio.js")
    import("@shoelace-style/shoelace/dist/components/radio-group/radio-group.js")
    import("@shoelace-style/shoelace/dist/components/button/button.js")
   
    let engine = getContext("engine")
    setTimeout(() => {
      initializeEditor({
        engine: engine,
        element: document.querySelector("#editor"),
        onRun: (text: string) => {
          engine.run(text)
        },
        onChange: (text: string) => {}
      })

      const dialog = document.querySelector('.dialog-overview');
//  const openButton = document.querySelector("#settings");
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

//  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());
      engine.run("")
    })
  }

</script>

<!-- <div id="toolbar">
  <img id="settings" src="/icons/sliders2-vertical.svg" alt="Settings" />
</div> -->
<div id="editor"></div>

<sl-dialog label="Dialog" class="dialog-overview">
  <sl-radio-group label="Select an option" name="source" value="1">
    <sl-radio value="js">In Browser</sl-radio>
    <sl-radio value="ws">WebSocket</sl-radio>
  </sl-radio-group>
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-dialog>
