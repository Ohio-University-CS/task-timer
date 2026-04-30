<script>
  import TypingBar from "$lib/TypingBar.svelte";
  import Button from "$lib/Button.svelte";
  import FocusedTimer from "$lib/FocusedTimer.svelte";
  import UnfocusedTimer from "$lib/UnfocusedTimer.svelte";


  // let timer = 31449600000
  
  let tasks = $state([
    {
      timer: 20000,
      name: "cram for stats"
    },
    {
      timer: 45000,
      name : 'learn physics for the final'
    },
    {
      timer: 62899200000,
      name : "graduate"
    },
  ])
  

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

<div class="w-screen h-screen flex items-center justify-center">
<!-- the app is vertical in nature -->
  <div class="flex flex-col items-center justify-center flex-nowrap"> 
    <!-- pw-3/7 -->
    {#if done}
      <div class="flex flex-row">
        <h1 class="text-6xl content-center text-center">THE TIMER IS DONE</h1>
        </div>
    {/if}
    <div class="m-3 outline-hidden content-center">
    <div class="flex flex-col">
        {#each tasks as task}
          <FocusedTimer timer=task.timer name=task.name></FocusedTimer>
        {/each}
    </div>
      <FocusedTimer {timer} {timeAdd} {timeUp} name={"Checkpoint 3"} desc={"idk present again again again or smthn"} dueMonth={4} dueDay={9} dueYear={2026}/>
      <FocusedTimer {timer} {timeAdd} {timeUp} name={"Checkpoint 3"} desc={"idk present again again again or smthn"} dueMonth={4} dueDay={9} dueYear={2026}/>
      <FocusedTimer {timer} {timeAdd} {timeUp} name={"Checkpoint 3"} desc={"idk present again again again or smthn"} dueMonth={4} dueDay={9} dueYear={2026}/>

        <UnfocusedTimer>{task.id}</UnfocusedTimer>

    </div>
  </div>
</div>


