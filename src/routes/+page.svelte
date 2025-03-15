<script lang="ts">
    import KBs from "$lib/KBs.svelte";
    import Docs from "$lib/Docs.svelte";
    import Editor from "$lib/Editor.svelte";

    let display = $state({comp: Editor})

    function script() {
        display = { comp: Editor }
    }

    function showDocs() {
        display = { comp: Docs }
    }

    function showKbs() {
        display = { comp: KBs }
    }
</script>

<div id="app">
    <div id="sidebar">
        <div><button onclick={script}>Script Eval</button></div>
        <div><button onclick={showDocs}>Docs</button></div>
        <div><button onclick={showKbs}>KBs</button></div>
    </div>
    <div id="main">
        <display.comp />
    </div>
</div>

<style>
    #sidebar {
        margin: 0;
        padding: 0;
        width: 200px;
        background-color: #EEE;
        position: fixed;
        height: 100%;
        overflow: auto;
    }

    #sidebar button {
        background: none;
        border: none;
        cursor: pointer;
    }

    #main {
        padding-left: 200px;
    }

    :global(.graph) {
        width: 400px;
        height: 400px;
    }

    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
