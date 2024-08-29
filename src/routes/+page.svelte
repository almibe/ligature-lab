<script lang="ts">
	import { newEngine } from "@ligature/ligature";
  import { browser } from '$app/environment';
  import Editor from "$lib/components/Editor.svelte";
	import TextView from "$lib/components/TextView.svelte";
  import { state } from "$lib/stores";
	import { setContext } from 'svelte';
  import "@shoelace-style/shoelace/dist/themes/light.css"

  let engine = newEngine()
  setContext("engine", engine)

  if (browser) {
    document.querySelector("#input").focus();
  }
</script>

<div id="container">
  <div id="input">
    <Editor></Editor>
  </div>
  <section id="results">
    <TextView></TextView>
  </section>
</div>

<style>
</style>