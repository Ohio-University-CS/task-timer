<script>
  import Button from "$lib/Button.svelte";
  import Timer from "$lib/Timer.svelte";

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

<!-- todo: -->
<!-- make button to add task -->
<!-- make button to edit task -->
<!-- make button to  -->



<!-- the app is vertical in nature -->
<div class="m-3 outline-none columns-1"> 


  <!-- focused timer -->
  <div class="m-5 outline-double rounded w-7e/10">
    <!-- invisible, for timer elements -->
    <div class="m-3e grid grid-cols-2 outline-hidden"> 
      <!-- left -->
      <div class="m-2 outline-dotted">
        <div class="m-5 outline-hidden rounded">
          <Timer {timer} {timeAdd} {timeUp}/>
          {#if done}
            <p>(external) it done</p>
          {/if}
        </div>
      </div>
      <!-- right -->
      <div class="m-2 outline-dotted">	
        <div class="m-2e outline-solid rounded">
          <h1 class="text-2xl">TASK NAME</h1>
        </div> 
        <div class="m-5e outline-solid">
          <h2>3/4/26</h2>
          <h2>DESC</h2>
        </div>
      </div>
    </div>
  </div>




  <div class="m-5 outline-double rounded">
    <div class="grid grid-cols-3">
      <h1>00:00:00</h1>
      <h1>TASK NAME 2</h1>
      <h1>4/2/26</h1>
    </div>
  </div>
</div>




