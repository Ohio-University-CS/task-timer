<script>
  import { msToHr, msToMin, msToSec } from "./timer_functions.svelte"
  
  // need to fix this later
  let {timer, name, dueMonth = 0, dueDay = 0, dueYear = 0} = $props()
</script>

<div class="unfocusedTaskTimer shadow-[5px_5px_0px_0px_#000]">
  <!-- columns -->
  <div class="grid grid-cols-3 text-xl">
    <!-- col 1 -->
    <h1 class="cols">{msToHr(timer)}:{msToMin(timer)}:{msToSec(timer)}</h1>
    <!-- col 2 -->
    <h1 class="cols">
      {#if (dueMonth !== 0 && dueDay !== 0 && dueYear !== 0)}
        {dueMonth}/{dueDay}/{dueYear}
      {:else}
        -=+=~=+=-
      {/if}
    </h1>
    <!-- col 3 -->
    <h1 class="cols">{name}</h1>
  </div>
</div>

<style>
.unfocusedTaskTimer {
  color: var(--color-slate-200);
  border-radius: var(--radius-sm);
  margin: calc(var(--spacing) * 5);
  outline: solid;
  outline-color: var(--color-black);
  flex: col;
  background-color: var(--color-blue-700);
  }

.cols {
  align-content: center;
  width: calc(var(--spacing)*1/3e);
  text-align: center;
  }
</style>
<!-- background-color: var(--color-green-400); -->
