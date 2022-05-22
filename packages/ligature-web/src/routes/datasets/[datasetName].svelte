<script>
import "blueprint-css/dist/blueprint.css";
import "tabbyjs/dist/css/tabby-ui.css";
import { page } from '$app/stores';
import { onMount } from 'svelte';

onMount(async () => {
    const Tabby = (await import('tabbyjs')).default
    let tabs = new Tabby('[data-tabs]');
});
</script>

<h1>Dataset {$page.params.datasetName}</h1>

<ul data-tabs>
    <li><a data-tabby-default href="#query">Query</a></li>
    <li><a href="#insert">Insert</a></li>
    <li><a href="#remove">Remove</a></li>
</ul>

<div id="query">
    Query
</div>

<div id="insert">
    Insert
</div>

<div id="remove">
    Remove
</div>
