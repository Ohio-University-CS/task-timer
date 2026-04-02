<script lang="js">
  import { msToHr, msToMin, msToSec} from './timer_functions.svelte.js';

  // pass props timer in ms and external functions
  let { timer, timeUp, timeAdd } = $props()
  let paused = $state(true)
  let done = $state(false) // for timeUp

  // countdown logic
  $effect(() => {
      if (!paused && timer > -1) { // countdown past 0 to eval done
      
        const interval = window.setInterval(() => {
          timer -= 125; // remove 1/4 a second
        }, 125); // for every 1/4 a second

        if (timer <= 0) {done = true} // cheat user out of 1/4th a second to achieve functioning timer alarm

        return () => clearInterval(interval);
      }
    });

  // effects for ending and resetting countdown
  $effect(()=> { if(done) { timeUp() } });
  $effect(()=> { if(done && timer > 0) {done = !done} });

</script>



<div>
  <!-- cant remember which style so keeping both for now -->
  <!-- <div class="flex flex-col"> -->
  <!--   <h1>{msToHr(timer)}:{msToMin(timer)}:{msToSec(timer)}</h1> -->
  <!-- </div> -->

  <div class="timer_outline">
    <p>{msToHr(timer)}:{msToMin(timer)}:{msToSec(timer)}</p>
  </div>

  <button onclick={paused = !paused} class="custom_button">
    {#if paused}
      Resume
    {:else }
      Pause
    {/if}  
  </button>

  {#if paused}
    <button onclick={timeAdd} class="custom_button">Add Time</button>
  {/if}
</div>


<style>
  .timer_outline {
  outline-style: solid;
  font-size: var(--text-7xl);
  border-radius: var(--radius-lg);
  margin: calc(var(--spacing) * 3);
  }

  .custom_button{
  border-radius: var(--radius-lg);
  outline-style: solid;
  margin: calc(var(--spacing) * 2);
  }

</style>
