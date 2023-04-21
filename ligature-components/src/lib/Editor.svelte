<script lang="ts">
    import "bulma/css/bulma.css";
    import { onMount, createEventDispatcher } from 'svelte';
    import {EditorView, basicSetup} from "codemirror";
    import {EditorState} from "@codemirror/state";
    import {javascript} from "@codemirror/lang-javascript";
    let inputEditor: EditorView | null = null;
    const dispatch = createEventDispatcher();
    onMount(async () => {
        document.body.addEventListener('keydown', function(e) {
            if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
                runQuery();
            }
        });
        const editorNode = document.getElementById("textEditor")!!;
        inputEditor = new EditorView({
            extensions: [
                EditorView.domEventHandlers({
                    keydown: e => {
                        if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault();
                        }
                    }
                }),
                basicSetup, 
                javascript()
            ],
            parent: editorNode
        });
        inputEditor.focus();
    });
    async function runQuery() {
        dispatch('runQuery', inputEditor!!.state.doc.toString());
    }
    function clear() {
        inputEditor!!.setState(EditorState.create({
            doc: "", 
            extensions: [
                EditorView.domEventHandlers({
                    keydown: e => {
                        if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault();
                        }
                    }
                }),
                basicSetup, 
                javascript()
            ]
        }))
        dispatch('clear');
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
