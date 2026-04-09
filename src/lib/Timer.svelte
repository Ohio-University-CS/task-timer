<script lang="js">
  import { msToHr, msToMin, msToSec} from './timer_functions.svelte.js';
  import audioPath from '$lib/sounds/alarm.mp3';

  // pass props timer in ms and external functions
  let { timer, timeAdd, timeUp } = $props();
  let paused = $state(true);
  let done = $state(false); // for timeUp
  let audio;

  //Creates the audio client side
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

  // effects for ending and resetting countdown
  $effect(()=> { if(done) { timeUp(); paused = true} });
  $effect(()=> { if(done && timer > 0) {done = !done} });
</script>

  <!-- cant remember which style so keeping both for now -->
  <!-- <div class="flex flex-col"> -->
  <!--   <h1>{msToHr(timer)}:{msToMin(timer)}:{msToSec(timer)}</h1> -->
  <!-- </div> -->


<div class="justify-center content-center text-center">
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
    border-radius: var(--radius-lg);
    box-shadow: 8px_8px_0px_0px_#000;
    margin: calc(var(--spacing) * 2);
    background-color: var(--color-white); 
    font-size: var(--text-7xl);
    text-align: center;
  }

  .custom_button{
    outline-style: solid;
    border-radius: var(--radius-lg);
    box-shadow: 1px_1px_0px_0px_#000;
    margin: calc(var(--spacing) * 4);
    background-color: var(--color-white); 
    font-size: var(--text-2xl);
  }

</style>
