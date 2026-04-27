<script>
  let { checked = $bindable(false) } = $props();
</script>

<label class="flex items-center gap-3 cursor-pointer select-none pr-2">
  <input type="checkbox" class="hidden" bind:checked />
  <div class="w-15 h-15 border-2 border-black flex items-center justify-center shrink-0 transition-all duration-50 border-5">
    {#if checked}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
        class="w-10 h-10">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    {/if}
  </div>
</label>
