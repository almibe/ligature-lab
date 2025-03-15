<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {showEditor, runScript} from "@ligature/ligature-components"
    import { state } from "./state.svelte";

    let editor = null;

    async function run() {
        document.querySelector("#results").innerHTML = ""
        let result = await fetch("/api/", {
            method: "POST",
            body: editor.state.doc.toString(),
        })
        let resultText = await result.text()
        state.resultText = resultText
        runScript(resultText, document.querySelector("#results"))
    }

    onMount(() => {
        editor = showEditor(document.querySelector("#editor"), state.editorText)
        if (state.resultText != "") {
            runScript(state.resultText, document.querySelector("#results"))
        }
    })

    onDestroy(() => {
        if (editor != null) {
            state.editorText = editor.state.doc.toString()
        }
    })

</script>

<div>
    <div><button onclick={run} id="runButton">Run</button></div>
    <div id="editor"></div>
    <div id="results"></div>    
</div>
