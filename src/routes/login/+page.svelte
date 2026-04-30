<script>
    import { getContext } from 'svelte'
	import { goto } from "$app/navigation";
    import { logIn } from "$lib/supabaseFunctions"
    import TypingBar from "$lib/TypingBar.svelte";
    import Button from "$lib/Button.svelte";
    
    let email = $state("");
    let password = $state("");
    let error = $state("");

    const supabase = getContext('supabase')
    
    const handleLogIn = async () => {
        const { data, error: logInError } = await logIn(supabase, email, password);

        if (logInError) {
            error = logInError.message;
            return;
        } else {
            console.log("User logged in:", data.user);
            goto("/");
        }
    };
</script>

<div class="flex h-screen w-screen items-center justify-center">
<div class="flex flex-col items-center justify-center border-2 bg-white p-6 rounded-lg shadow-[4px_4px_0px_0px_#000] w-1/4">
    <h1 class="text-3xl font-bold mb-4">Log In</h1>
    <TypingBar placeholder="Email" bind:value={email} />
    <TypingBar placeholder="Password" bind:value={password} />

    {#if error}
        <p class="text-red-400 mt-2 text-sm">{error}</p>
    {/if}

    <button onclick={handleLogIn}><Button text="Log In" /></button>
</div>
</div>
