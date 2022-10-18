<script lang="ts">
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import  "tabulator-tables/dist/css/tabulator.min.css";
import "blueprint-css/dist/blueprint.css";
import "tabbyjs/dist/css/tabby-ui.css";
import "codemirror/lib/codemirror.css";
import { page } from '$app/stores';
import { onMount, onDestroy } from 'svelte';
import { wanderResultToPresentation } from '../../lib/presentation';

let inputEditor = null;
let text = {
    query : "",
    insert : "",
    remove : "",
    queryResults: "",
    insertResults: "",
    removeResults: ""
};
let tabs = null;
let table = null;
let currentTab = "query";
let resultText = "";

onMount(async () => {
    const Tabby = (await import('tabbyjs')).default;
    const CodeMirror = (await import('codemirror')).default;
    tabs = new Tabby('[data-tabs]');
    inputEditor = CodeMirror.fromTextArea(document.getElementById("editorTextArea"), {lineNumbers: true});
    document.addEventListener('tabby', onTabChange, false);

    table = new Tabulator("#table", {
 	    height:205,
 	    data:[],
 	    layout:"fitColumns",
 	    columns:[{title:"", field:""}]});

    //clean up
    return () => {
        document.removeEventListener('tabby', onTabChange);
    };
});

function onTabChange(event) {
    var tab = event.target.href.split("#")[1];
    text[currentTab] = inputEditor.getValue();
    text[currentTab + "Results"] = resultText;
    inputEditor.setValue(text[tab]);
    resultText = text[tab + "Results"];
    currentTab = tab;
}

async function runQuery() {
    let result = await fetch(`/datasets/${$page.params.datasetName}/wander`, {
        method: 'POST',
        body: inputEditor.getValue()
    });
    resultText = await result.text();
    //handle table
    let presentation = wanderResultToPresentation(resultText);
    if ('error' in presentation) {
        //TODO handle error
    } else {
        let tablePresentation = presentation.tableView();
        table.setColumns(tablePresentation.columns);
        table.replaceData(tablePresentation.data);
    }
    //TODO handle graph
    text["queryResults"] = resultText;
}

async function runInsert() {
    let result = await fetch(`/datasets/${$page.params.datasetName}/statements`, {
        method: 'POST',
        body: inputEditor.getValue()
    })
    resultText = await result.text();
    text["insertResults"] = resultText;
}

async function runRemove() {
    let result = await fetch(`/datasets/${$page.params.datasetName}/statements`, {
        method: 'DELETE',
        body: inputEditor.getValue()
    })
    resultText = await result.text();
    text["removeResults"] = resultText;
}

function clear() {
    inputEditor.setValue("");
    inputEditor.clearHistory();
    text[currentTab] = "";
    text[currentTab + "Results"] = "";
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
    <div id="resultText">{resultText}</div>
    <div id="table"></div>
    <div id="graph"></div>
</div>

<style>
.backButton {
    float: right
}
</style>
