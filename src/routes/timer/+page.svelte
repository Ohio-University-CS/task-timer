<script>
  import TypingBar from "$lib/TypingBar.svelte";
  import Button from "$lib/Button.svelte";
  import FocusedTimer from "$lib/FocusedTimer.svelte";
  import UnfocusedTimer from "$lib/UnfocusedTimer.svelte";

  let timer = 3000
  let done = false

  function timeAdd() {
    timer += 10000
    done = false
  }

  function timeUp() {
    timer = 0;
    done = true
  }

</script>



<!-- figure out basic responsive design (for fonts mainly) in this file -->
<!-- make "focused task" and "unfocused task" from this page -->
<!-- make crud buttons for both of them -->
<!-- make draggable components in a vertical queue -->

<!-- idea for "chain" part of task timer: -->
<!-- chaining tasktimers to avoid distractions when taking "a quick break" -->


<!-- the app is vertical in nature -->
<main class="flex justify-center columns-1"> 
  <!-- pw-3/7 -->
  {#if done}
    <h1 class="text-9xl content-center text-center">THE TIMER IS DONE</h1>
  {/if}
  <div class="m-3 outline-hidden content-center">
  <div>
    <FocusedTimer {timer} {timeAdd} {timeUp} name={"Checkpoint 3"} desc={"idk present again again again or smthn"} dueMonth={4} dueDay={9} dueYear={2026}/>
  </div>
  <UnfocusedTimer timer={120000} name={"Stretch"}></UnfocusedTimer>  
  <UnfocusedTimer timer={3600000} name={""} dueMonth={4} dueDay={8} dueYear={2026}></UnfocusedTimer>  
  </div>
</main>


<style>
  main {
    background-color: var(--color-amber-400);
    min-height: 100vh;
    min-width: 100%
  }
</style>


