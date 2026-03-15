<script lang="ts">

// declare variables 
  let { timer } = $props()
  let paused = $state(true)
  // let timer = $state(27165000) // parameter placeholder
  // need to make sound / notification for done in future 

// accessors cause runes are weird
  const is_paused = () => {return paused} 
  const get_time = () => {return timer}

	let now = Date.now() // where timer starts
	let later = now + get_time()

// mutators
  function toggle_pause() { paused = !paused }

 $effect(() => {
    if (!paused && timer > 0) { // only countdown if unpaused
      const interval = window.setInterval(() => {
        timer -= 125; // remove 1/4 a second
      }, 125); // for every 1/4 a second

      return () => clearInterval(interval);
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
	<h1>{ms_to_hr(timer)}:{ms_to_min(timer)}:{ms_to_sec(timer)}</h1>
	
  <button onclick={toggle_pause}>
    {#if paused}
      Resume
    {:else }
      Pause
    {/if}  
  </button>

	<button>
		Mark Done (WIP)
	</button>
</div>


<!-- styles go here -->
