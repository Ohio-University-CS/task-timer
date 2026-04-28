<script>
	import { getContext } from 'svelte'
    import Button from "$lib/Button.svelte";
    import { signUp, checkPasswordStrength, checkEmailValidity } from "$lib/supabaseFunctions.js"
	import TypingBar from "$lib/TypingBar.svelte";
	import { goto } from "$app/navigation";
    
    let email = $state("");
    let password = $state("");
    let error = $state("");

    const supabase = getContext('supabase')

    async function handleSignUp() {
        const emailError = checkEmailValidity(email);
        if (emailError) {
            error = emailError;
            return;
        }

        const passwordError = checkPasswordStrength(password);
        if (passwordError) {
            error = passwordError;
            return;
        }

        const { user, error: signUpError } = await signUp(supabase, email, password);
        if (signUpError) {
            error = signUpError.message;
            return;
        } else {
            // Handle successful sign-up (e.g., redirect to dashboard)
            console.log("User signed up:", user);
        }
        console.log("Sign-up attempted with email:", email);

        goto("/");
    }

</script>

<div class="flex h-screen w-screen items-center justify-center">
<div class="flex flex-col items-center justify-center border-2 bg-white p-6 rounded-lg shadow-[4px_4px_0px_0px_#000] w-1/4">
    <h1 class="text-3xl font-bold mb-4">Sign Up</h1>
    <TypingBar placeholder="Email" bind:value={email} />
    <TypingBar placeholder="Password" bind:value={password} />

    {#if error}
        <p class="text-red-400 mt-2 text-sm">{error}</p>
    {/if}

    <button onclick={handleSignUp}><Button text="Sign Up" /></button>
</div>
</div>