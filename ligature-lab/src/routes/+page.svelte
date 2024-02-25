<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores'
    import Graphs from '$lib/Graphs.svelte';
    import { onMount } from 'svelte';
    import '../main.css';
    onMount(async () => {

    })
</script>

<header>
    <h1 class="title is-2" style="display:inline">Ligature Lab</h1>

    {#if $page.data.session?.user}
        <p>Hello, {$page.data.session.user.email} &dash; <button on:click={signOut} id="signOut">Sign out</button></p>
        <Graphs />
    {:else}
        <p>Not signed in.</p>
        <button on:click={() => signIn('github')}>Sign in with GitHub</button>
    {/if}
</header>
