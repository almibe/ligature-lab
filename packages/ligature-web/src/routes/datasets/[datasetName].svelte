<script>    
import "blueprint-css/dist/blueprint.css";
import "tabbyjs/dist/css/tabby-ui.css";
import "codemirror/lib/codemirror.css";
import { page } from '$app/stores';
import { onMount, onDestroy } from 'svelte';

let inputEditor = null;
let text = {
    query : "",
    insert : "",
    remove : ""
}
let tabs = null;
let currentTab = "query"
let dataset = "";

onMount(async () => {
    const Tabby = (await import('tabbyjs')).default
    const CodeMirror = (await import('codemirror')).default
    tabs = new Tabby('[data-tabs]');
    inputEditor = CodeMirror.fromTextArea(document.getElementById("editorTextArea"), {lineNumbers: true});
    document.addEventListener('tabby', onTabChange, false);
    dataset = page.params.datasetName;

    //clean up
    return () => document.removeEventListener('tabby', onTabChange);
});

function onTabChange(event) {
    var tab = event.target.href.split("#")[1];
    text[currentTab] = inputEditor.getValue();
    inputEditor.setValue(text[tab]);
    currentTab = tab;
}

function runQuery() {
    fetch(`/datasets/${dataset}/wander`, {
        method: 'POST',
        body: inputEditor.getValue()
    });
}

function runInsert() {
    console.log("insert")
}

function runRemove() {
    console.log("remove")
}

function clear() {
    inputEditor.setValue("");
    inputEditor.clearHistory();
    text[currentTab] = "";
}
</script>

<h1>{$page.params.datasetName}</h1>
<button class="backButton" on:click={() => window.location.href = '/'}>Back</button>

<ul data-tabs>
    <li><a data-tabby-default href="#query">Query</a></li>
    <li><a href="#insert">Insert</a></li>
    <li><a href="#remove">Remove</a></li>
</ul>

<div id="query">
    <button on:click={() => runQuery()}>Run</button>
    <button on:click={() => clear()}>Clear</button>
</div>

<div id="insert">
    <button on:click={() => runInsert()}>Run</button>
    <button on:click={() => clear()}>Clear</button>
</div>

<div id="remove">
    <button on:click={() => runRemove()}>Run</button>
    <button on:click={() => clear()}>Clear</button>
</div>

<div id="textEditor">
    <textarea id="editorTextArea"></textarea>
</div>

<div id="results">
</div>

<style>
.backButton {
    float: right
}
</style>
