<script lang="ts">
    import "bulma/css/bulma.css";
    import Editor from "./Editor.svelte";
    import Results from "./Results.svelte";

    export let results: Array<string>
</script>

<Editor on:runQuery on:clear />
<Results {results} />
