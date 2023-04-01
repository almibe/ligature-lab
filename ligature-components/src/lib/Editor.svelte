<script lang="ts">
    import "bulma/css/bulma.css";
    import { onMount, createEventDispatcher } from 'svelte';
    import {EditorView, basicSetup} from "codemirror";
    import {EditorState} from "@codemirror/state";
    import {javascript} from "@codemirror/lang-javascript";
    let inputEditor: EditorView | null = null;
    let dispatch = createEventDispatcher();
    onMount(async () => {
        inputEditor = new EditorView({
            extensions: [basicSetup, javascript()],
            parent: document.getElementById("textEditor")!!
        });
    });
    async function runQuery() {
        dispatch('runQuery', inputEditor!!.state.doc.toString());
    }
    function clear() {
        inputEditor!!.setState(EditorState.create({doc: "", extensions: [basicSetup, javascript()]}))
    }
</script>

<div id="query">
    <button class="button" on:click={() => runQuery()}>Run</button>
    <button class="button" on:click={() => clear()}>Clear</button>
</div>
    
<div id="textEditor"></div>

<style>
    #textEditor {
        height:300px;
        resize: vertical;
        overflow:scroll;
    }
</style>
