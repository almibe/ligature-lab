<script lang="ts">
    import { onMount } from "svelte";
    import {showEditor, createComponentFns} from "@ligature/ligature-components"
    import {runWithFns} from "@ligature/ligature"

    let editor = null;
    let actions = null;

    function run() {
        document.querySelector("#results").innerHTML = ""
        runWithFns(actions, editor.state.doc.toString())
    }

    onMount(() => {
        editor = showEditor(document.querySelector("#editor"), "docs display-table")
        actions = createComponentFns(document.querySelector("#results"))
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
