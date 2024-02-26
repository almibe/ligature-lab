<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores'
    import Graphs from '$lib/Graphs.svelte';
    import { onMount } from 'svelte';
    import '../main.css';
    import '@shoelace-style/shoelace/dist/themes/light.css';
    import '@shoelace-style/shoelace/dist/components/button/button.js';
    onMount(async () => {

    })
</script>

<header>
    <h1>Ligature Lab</h1>

    {#if $page.data.session?.user}
        <p>Hello, {$page.data.session.user.email} &dash; <button on:click={signOut} id="signOut">Sign out</button></p>
        <Graphs />
    {:else}
        <p>Not signed in.</p>
        <button on:click={() => signIn('github')}>Sign in with GitHub</button>
    {/if}
</header>
