
<!-- TODO: 
        Add dashboard at top and/or side
        Add settings functionability after more of the site has been implemented
        Clean up design -->


<script>
	import { goto } from '$app/navigation';
    import Option from '$lib/Option.svelte';
    import { logOut } from '$lib/supabaseFunctions.js';
    import { getContext } from 'svelte';

    const supabase = getContext('supabase');

    let accountSettings = ["Profile", "Security", "Log Out"];
    let accessibilitySettings = ["Dark Mode", "Military Time"];

    let accountSettingFunctions = [() => console.log("Profile"), 
                                () => console.log("Security"), 
                                async () => {await logOut(supabase); goto("/")}];

    let accessibilitySettingFunctions = [() => console.log("Dark Mode"), 
                                        () => console.log("Military Time")];

    async function handleLogOut() {
        const { error } = await logOut(supabase);
        if (error) {
            console.error("Error logging out:", error);
        }
    }
</script>

<div class="flex flex-col items-center justify-center p-4 pt-20 bg-amber-50 w-full min-h-screen">
<!-- Add options here -->
    <div class="flex flex-col p-4 border-2 bg-white rounded-2xl shadow-[4px_4px_0px_0px_#000]">
        <Option optionName="Account Settings" options={accountSettings} optionFunctions={accountSettingFunctions} />
        <Option optionName="Accessibility" options={accessibilitySettings} optionFunctions={accessibilitySettingFunctions} />
    </div>

</div>