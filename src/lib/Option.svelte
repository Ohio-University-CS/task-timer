<script>
    import SubList from '$lib/SubList.svelte';

    var {optionName} = $props();

    let showDropdown = $state(false);

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    let accountSettings = ["Profile", "Security", "Log Out"];
    let accessibilitySettings = ["Dark Mode", "Military Time"];
</script>

<div class="flex flex-col items-center justify-start p-4 bg-white w-2xl">
    <div class="flex flex-row justify-between w-full">
        {optionName}

        <button class="cursor-pointer" onclick={toggleDropdown}>&#8615;</button>
    </div>
    

    {#if showDropdown && optionName === "Account Settings"}
        <SubList options={accountSettings} />

    {:else if showDropdown && optionName === "Accessibility"}
        <SubList options={accessibilitySettings} />
    {/if}
</div>

<!-- <style>
    .container {
        display: inline-block;
        font-size: 30px;
        font-family: "Lucida Console", Monaco, "Courier New", monospace;
        padding: 20px 40px 20px 20px;
        margin: 100px 150px;
        border: 0.1em solid black;
        border-radius: 20px;
        background-color: lightgray;
        position: relative;
        max-width: 600px;
    }

    button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
    }

    .dropdown 
    {
        margin-top: 15px;
        background: #f0f0f0;
        border-radius: 10px;
        padding: 10px;
    }


    .dropdown p 
    {
        margin: 5px 0;
        cursor: pointer;
    }

    .dropdown p:hover
    {
        background-color: lightblue;
    }

</style> -->