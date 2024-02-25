<script lang="ts">
import AddGraph from "./AddGraph.svelte";
</script>

<div id="graphs" class="content">
    <h2 class="title is-3 is-inline">Graphs</h2>
    <AddGraph />
    <!-- <button id="addGraph" class="button" on:click={addGraph}>Add Graph</button> -->

    <ul>
        <li><a href="/graphs/sample">Sample Graph</a></li>
    </ul>
</div>
