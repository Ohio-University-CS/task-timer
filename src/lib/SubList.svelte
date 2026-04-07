<script>
	import Checkbox from "./Checkbox.svelte";

    var {options} = $props();

</script>

<div class="flex flex-col items-center justify-between p-4 bg-white w-full">
    {#each options as option}
        <div class="flex p-2 hover:bg-gray-200 cursor-pointer w-full border-b-0 border-t-2 border-r-2 border-l-2 last:border-b-2 border-black">
            <div class="flex p-2 hover:bg-gray-200 cursor-pointer w-full">{option}</div>
        </div>
        
    {/each}
</div>