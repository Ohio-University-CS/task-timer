<!-- Final grade calculator with full functionality. I will probably revisit the UI later. -->

<script>
    import Button from '$lib/Button.svelte';
    import TypingBar from '$lib/TypingBar.svelte';

    const STARTING_ROWS = 3;
    let gradeData = $state(
        Array.from({ length: STARTING_ROWS }, () => ({
            assignmentName: '',
            score: '',
            weight: ''
        }))
    );

    let targetGrade = $state('');
    let showCalculation = $state(false);
    let showError = $state(false);
    let calculationResult = $state('');

    function addRow()
    {
        gradeData.push({
            assignmentName: '',
            score: '',
            weight: ''
        });
    }

    function deleteRow()
    {
        if (gradeData.length > 1) { gradeData.pop(); }
    }

    function calculate()
    {
        showCalculation = false;
        showError = true;

        if (!targetGrade)
        {
            calculationResult = "Error: please make sure all boxes are filled.";
            return calculationResult;
        }

        if (isNaN(targetGrade))
        {
            calculationResult = "Error: ensure target grade is a number.";
            return calculationResult;
        }

        let summation = 0;
        let remainingWeight = 100;

        for (let i = 0; i < gradeData.length; i++)
        {

            if (!gradeData[i].assignmentName || !gradeData[i].score || !gradeData[i].weight)
            {
                calculationResult = "Error: please make sure all boxes are filled.";
                return calculationResult;
            }

            if (isNaN(gradeData[i].score || isNaN(gradeData[i].weight)))
            {
                calculationResult = "Error: ensure grade or weight boxes are numbers.";
                return calculationResult;
            }

            summation += (Number(gradeData[i].score) * Number(gradeData[i].weight) / 100);
            remainingWeight -= Number(gradeData[i].weight);

            console.log("Summation: " + summation);
        }

        showCalculation = true;
        showError = false;

        if (remainingWeight <= 0)
        {
            calculationResult = "Final Grade: " + summation;
            return calculationResult;
        }

        let needed = (targetGrade - summation) / remainingWeight * 100;
        needed = needed.toFixed(1);

        if (needed <= 0)
        {
            calculationResult = "A final grade of " + targetGrade + " is attainable regardless of how you score on the remaining " + remainingWeight + "% of tasks."
            return calculationResult;
        }
   
        calculationResult = "You need a grade of " + needed + " on the remaining " + remainingWeight + "% of tasks to ensure a final grade of " + targetGrade + "%";
        return calculationResult;

    }

    function clear()
    {
        gradeData = [];
        gradeData.push({
            assignmentName: '',
            score: '',
            weight: ''
        });

        targetGrade = ''; 
    }

</script>

<div class="pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 border-2
 border-black rounded-2xl flex flex-col justify-start items-start bg-sky-300">
    {#each gradeData as row}
        <div class="flex gap-2 w-full">
            <TypingBar bind:value={ row.assignmentName } placeholder="Assignment Name"></TypingBar>
            <TypingBar bind:value={ row.score } placeholder="Grade"></TypingBar>
            <TypingBar bind:value={ row.weight } placeholder="Weight"></TypingBar>
        </div>
    {/each}

    <div class="flex justify-between w-full">
        <button onclick={addRow}>
            <Button text="Add Row" color="bg-slate-300"></Button></button>
        <button onclick={deleteRow}>
            <Button text="Delete Row" color="bg-slate-300"></Button></button>
    </div>

    <div class="flex justify-center">
        <div>
            <TypingBar bind:value={ targetGrade } placeholder="Target Grade"></TypingBar>
        </div>
    </div>

    <div class = "flex justify-around w-full">
        <button onclick={calculate}>
            <Button text="Calculate" color="bg-slate-300"></Button></button>
        
        <button onclick={clear}>
            <Button text="Clear" color="bg-slate-300"></Button></button>
    </div>

    {#if showCalculation}
        <div class="pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 border-2
        border-black rounded-2xl flex flex-col justify-center items-start bg-slate-300">
        { calculationResult }
        </div>
    {:else if showError}
        <div class="pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 border-2
        border-black rounded-2xl flex flex-col justify-center items-start bg-red-300">
        { calculationResult }
        </div>
    {/if}
</div>

