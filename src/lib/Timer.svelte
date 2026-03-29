<script lang="ts">

  let { timer, timeUp, timeAdd } = $props()
  let paused = $state(true)

  // for testing, use this time var
  // let timer = $state(27165000) // parameter placeholder

  function toggle_pause() { paused = !paused }
 
 $effect(() => {
    if (!paused && timer > 0) { // countdown
      const interval = window.setInterval(() => {
        timer -= 125; // remove 1/4 a second
      }, 125); // for every 1/4 a second

      return () => clearInterval(interval);
    }
    else if (timer <= 0) { // alarm / notify
      {timeUp}
    }
  });


  // OUTPUT
  // weird situational floor helper function
  function floor (number) { return number = number - number%1 }

  // for printing time as hour minute second from ms
  function ms_to_hr(ms) {
		let hr = floor(ms/3600000)
		return hr
	}
	
  function ms_to_min(ms) {
		let min = floor((ms%3600000)/60000)
		if (min < 10) { return '0' + min }
		else { return min }
	}
	
  function ms_to_sec(ms) {
		let sec = floor((ms%60000)/1000)
		if (sec < 10) { return '0' + sec }
		else { return sec}
	}

</script>

<div>
  <div class="timer_outline">
    <p>{ms_to_hr(timer)}:{ms_to_min(timer)}:{ms_to_sec(timer)}</p>
  </div>
	
  <button onclick={toggle_pause} class="pause_button">
    {#if paused}
      Resume
    {:else }
      Pause
    {/if}  
  </button>
  {#if paused}
    <button onclick={timeAdd}>Add Time</button>
  {/if}

</div>


<style>
  .timer_outline {
  outline-style: solid;
  font-size: var(--text-7xl);
  border-radius: var(--radius-lg);
  margin: calc(var(--spacing) * 3);
  }

  .pause_button {
  border-radius: var(--radius-lg);
  outline-style: solid;
  margin: calc(var(--spacing) * 2);
  }

</style>

<!-- styles go here -->
