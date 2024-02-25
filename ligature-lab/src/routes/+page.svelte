<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores'
    //import * as ace from 'ace-builds/src/ace';
    import { onMount } from 'svelte';

    onMount(async () => {
        const ace = await import('ace-builds/src/ace')
        
        const element = document.querySelector("#editor")
        if (element != null) {
            ace.edit(element, {
                mode: "ace/mode/javascript",
                selectionStyle: "text"
            })
        }
    })
</script>

<h1>Welcome to SvelteKit</h1>

{#if $page.data.session?.user}
    <p>Signed in as {$page.data.session.user.email}</p>
    <button on:click={signOut}>Sign out</button>
    <div id="editor"></div>
{:else}
    <p>Not signed in.</p>
    <button on:click={() => signIn('github')}>Sign in</button>
{/if}
