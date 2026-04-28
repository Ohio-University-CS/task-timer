<script>
  import TypingBar from "$lib/TypingBar.svelte";
  import Button from "$lib/Button.svelte";
  import FocusedTimer from "$lib/FocusedTimer.svelte";
  import UnfocusedTimer from "$lib/UnfocusedTimer.svelte";


  // let timer = 31449600000
  let timer = 1000
  let done = false

  function timeAdd() {
    done = false // also necessary
    timer += 10000 // changing timer value here is intended. needs variable way to do this
  }

  function timeUp() {
    done = true // only required statement
    // play a sound or something
  }

</script>



<!-- figure out basic responsive design (for fonts mainly) in this file -->
<!-- make "focused task" and "unfocused task" from this page -->
<!-- make crud buttons for both of them -->
<!-- make draggable components in a vertical queue -->

<!-- idea for "chain" part of task timer: -->
<!-- chaining tasktimers to avoid distractions when taking "a quick break" -->


<!-- the app is vertical in nature -->
<div class="flex flex-col items-center justify-center flex-nowrap"> 
  <!-- pw-3/7 -->
  {#if done}
    <div class="flex flex-row">
      <h1 class="text-6xl content-center text-center">THE TIMER IS DONE</h1>
      </div>
  {/if}
  <div class="m-3 outline-hidden content-center">
  <div>
    <FocusedTimer {timer} {timeAdd} {timeUp} name={"Checkpoint 3"} desc={"idk present again again again or smthn"} dueMonth={4} dueDay={9} dueYear={2026}/>
  </div>
  <UnfocusedTimer timer={120000} name={"Stretch"}></UnfocusedTimer>  
  <UnfocusedTimer timer={3600000} name={""} dueMonth={4} dueDay={8} dueYear={2026}></UnfocusedTimer>  
  </div>
</div>


