<script lang="js">
  import { msToHr, msToMin, msToSec} from './timer_functions.svelte.js';
  import audioPath from '$lib/sounds/alarm.mp3';

  // pass props timer in ms and external functions
  let { timer, timeUp } = $props();
  let paused = $state(true);
  let done = $state(false); // for timeUp
  let audio;

  $effect(() => {
    audio = new Audio(audioPath);
  });

  // countdown logic
  $effect(() => {
      if (!paused && timer > -1) { // countdown past 0 to eval done
      
        const interval = window.setInterval(() => {
          timer -= 125; // remove 1/4 a second
        }, 125); // for every 1/4 a second

        return () => clearInterval(interval);
      }
    });

  // effects for ending and resetting countdown
  $effect(()=> {
    if(timer <= 0 && !done) {
      done = true;
      paused = true;
      audio?.play();
      timeUp();
    }
  });

  $effect(()=> { if(done && timer > 0) {done = false} });

  function timeAdd() {
    timer += 300000;

    if (timer > 0) {done = false;}
  }

</script>

<div>
  <!-- cant remember which style so keeping both for now -->
  <!-- <div class="flex flex-col"> -->
  <!--   <h1>{msToHr(timer)}:{msToMin(timer)}:{msToSec(timer)}</h1> -->
  <!-- </div> -->

  <div class="timer_outline">
    <p>{msToHr(timer)}:{msToMin(timer)}:{msToSec(timer)}</p>
  </div>

  <button onclick={() => paused = !paused} class="custom_button">
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
