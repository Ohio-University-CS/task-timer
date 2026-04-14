<!-- Input.svelte -->
<script>
  let { value = $bindable(''), placeholder = 'New Task' } = $props();
</script>

<input
  type="text"
  bind:value
  {placeholder}
  class="w-full border-2 border-black bg-amber tracking-wide px-3 py-2 outline-none focus:bg-blue-50 placeholder:text-gray-300 placeholder:font-normal rounded-lg m-1"
/>