<script>
    import { goto } from '$app/navigation';
	import Button from '$lib/Button.svelte';

    /* Pass options as an object. For example:
       options={[
        { label: "Caffeine Calculator", href: "/caffeiene-calculator" },
        { label: "Grade Calculator", href: "/grade-calculator" }
       ]} */
	let { buttonText, options, bg_color = "white", font = "sans", text_size = "sm" } = $props();
    let showDropdown = $state(false);

    function toggleDropdown()
    {
        showDropdown = !showDropdown;
    }

</script>

<div>
    <div class="relative">
        <button onclick={toggleDropdown}>
            <Button text={buttonText}></Button>
        </button>

        {#if showDropdown}
            <div class="absolute left-0 top-full w-full z-50 bg-white">
                {#each options as option}
                    <button 
                        type="button" 
                        class="w-full text-left p-2 hover:bg-gray-200 border-t-2 border-x-2 last:border-b-2 border-black font-{font} bg-{bg_color} text-{text_size}"
                        onclick={() => {
                            toggleDropdown();
                            goto(option.href);
                        }}
                    >
                        {option.label}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>