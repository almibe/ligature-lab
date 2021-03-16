<script context="module">
	export async function preload(page, session) {
		const { datasetname } = page.params;
		return { datasetname };
	}
</script>

<script>
    export let datasetname;
</script>

<svelte:head>
    <title>Ligature Lab/{datasetname}</title>
</svelte:head>

<div class="container">
    <div class="row p-4">
        <div class="col-sm-auto">
            <h1>Ligature Lab/{datasetname}</h1>
        </div>
    </div>
</div>
