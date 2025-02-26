<script lang="ts">
    import { onMount } from "svelte";
    import {showEditor, runScript} from "@ligature/ligature-components"

    let editor = null;

    async function run() {
        document.querySelector("#results").innerHTML = ""
        let result = await fetch("/api/", {
            method: "POST",
            body: editor.state.doc.toString(),
        })
        let resultText = await result.text()
        runScript(resultText, document.querySelector("#results"))
    }

    onMount(() => {
        editor = showEditor(document.querySelector("#editor"), "docs")
    })
</script>

<div id="app">
    <div><button onclick={run} id="runButton">Run</button></div>
    <div id="editor"></div>
    <div id="results"></div>
</div>

<style>
    :global(.graph) {
        width: 400px;
        height: 400px;
    }
</style>
