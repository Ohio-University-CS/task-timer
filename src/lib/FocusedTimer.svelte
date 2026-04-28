<script lang="js">
  import Timer from "./Timer.svelte";
  import Button from "./Button.svelte";
  import Checkbox from "./Checkbox.svelte";

  import pencilIcon from "$lib/assets/icons8-pencil-50.png";
  import trashIcon from "$lib/assets/icons8-trash-50.png";


  // need to make props into single json to destruct
  let {timer, timeUp, timeAdd, name, dueMonth = 0, dueDay = 0, dueYear = 0, desc = "", extensions = 0, totalTime = 0, initTime = timer, completed = false, } = $props()
  // need to add buttons for edit, delete, and checkbox functionality
  // need to add draggable element library for the draggable bars
  // apparently sound works for timer so pass that too
  // need to Make timeAdd consider the elapsed time
  let checked = $state(false)
</script>

<!-- whole thing is flex row -->
<div class="flex flex-row flex-nowrap w-200"> 

  <!-- card is a flex row -->
  <div class="flex flex-row justify-center focusedCard flex-nowrap shadow-[4px_4px_0px_0px_#000]">

    <!-- timer is a flex col -->
    <div class="m-2 outline-hidden flex flex-col">
      <div class="m-5 outline-hidden rounded">
        <Timer {timer} {timeAdd} {timeUp}/>
      </div>
    </div>

    <!-- task is a flex col-->
    <div class="m-2 flex flex-col">
      <div class="m-5 outline-solid rounded focusedInfo">
        <h1 class="text-3xl">{name}</h1>
      </div> 

      <!-- due and desc stuff-->
      {#if dueMonth !== 0 && dueDay !== 0 && dueDay !== 0 || desc !== ""}
      <div class="m-5 outline-solid rounded focusedInfo">
        <!-- due logic -->
        {#if dueMonth !== 0 && dueDay !== 0 && dueYear !== 0}
          <h2 class="m-2 px-5 py-2">{dueMonth}/{dueDay}/{dueYear}</h2>
        {/if}
        <!-- desc logic -->
        {#if desc !== ""}
          <h2 class="m-2 px-5 py-2">{desc}</h2>
        {/if}
      </div>
      {/if}
    </div>
  </div>

  <!-- crud buttons column -->
  <div class="flex flex-col items-center-safe justify-center items-start">
    <div class="items-center items-center w-11">
      <Checkbox bind:checked></Checkbox>
    </div>
    <div class>
      <button onclick={editMenu} class="focusedFloaters cursor-pointer">
        <img src={pencilIcon} alt="edit icon" class="w-7 h-auto m-2">
      </button>
    </div>
    <div class="flex flex-row">
      <button onclick={editMenu} class="focusedFloaters cursor-pointer">
        <img src={trashIcon} alt="delete icon" class="w-7 h-auto m-2">
      </button>
    </div>
  </div>
</div>


<style>
.focusedCard {
  margin: calc(var(--spacing) * 5); 
  border-radius: var(--radius-3xl);
  
  border-width: 2px;
  flex: auto;
  }

.focusedInfo {
  background-color: var(--color-white); 
  border: solid;
  border-width: 1px;
  padding-left: 1em;
  padding-right: 1em;
  }

.focusedFloaters {

  margin: calc(var(--spacing) * 2); 
  border: solid;
  border-width: 1px;
  border-radius: var(--radius-lg);
  font-size: var(--text-2xl);
  outline-style: solid;
  background-color: var(--color-white); 
  box-shadow: 1px_1px_0px_0px_#000;
  }
</style>
