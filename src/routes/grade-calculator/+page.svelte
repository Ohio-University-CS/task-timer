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
   
        calculationResult = "You need a grade of " + needed + " on the remaining " + remainingWeight + "% of tasks to ensure a final grade of " + targetGrade + "%.";
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

<div class="min-h-screen flex bg-[#f8e0ea] p-4">

    <div class="flex items-center justify-start">
        <div class="w-96 h-4/5 mt-12 pl-2 shadow-[4px_4px_0px_0px_#000] border-black rounded-2xl bg-[#d1ffbd] border-2 flex flex-col items-center justify-center gap-2 font-mono">   
            <p class="text-2xl font-extrabold"><u>Grade Calculator</u></p>
            <p class="pt-2">
                This tool will determine what grade (percentage) you need in the remaining grades of the class in order to obtain a target grade.<br><br>
                Please provide the following:<br><br>
                <b><u>Assignment Name:</u></b> title of assignment (homework, lab, midterm, etc.)<br>
                <b><u>Grade:</u></b> score received on assignment<br>
                <b><u>Weight:</u></b> grade weight for assignment (ex. midterm could be worth 20% of total grade)<br>
                <b><u>Target Grade:</u></b> the grade you want to earn<br><br>
                Upon hitting "Calculate", the grade calculator will give the minimum percentage you must earn on the remaining grades to earn your target grade.
            </p>
            
        </div>
    </div>

    <div class="flex items-center justify-center">
        <div class="pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 border-2
        border-black rounded-2xl flex flex-col justify-start items-start bg-[#f3e2c6]">

            {#each gradeData as row}
                <div class="flex gap-2 w-full font-mono">
                    <TypingBar bind:value={row.assignmentName} placeholder="Assignment Name" />
                    <TypingBar bind:value={row.score} placeholder="Grade" />
                    <TypingBar bind:value={row.weight} placeholder="Weight (%)" />
                </div>
            {/each}

            <div class="flex justify-between w-full font-mono font-bold">
                <button onclick={addRow}>
                    <Button text="Add Row" color="bg-slate-300" />
                </button>
                <button onclick={deleteRow}>
                    <Button text="Delete Row" color="bg-slate-300" />
                </button>
            </div>

            <div class="flex justify-center font-mono">
                <TypingBar bind:value={targetGrade} placeholder="Target Grade" />
            </div>

            <div class="flex justify-around w-full font-mono font-bold">
                <button onclick={calculate}>
                    <Button text="Calculate" color="bg-slate-300" />
                </button>

                <button onclick={clear}>
                    <Button text="Clear" color="bg-slate-300" />
                </button>
            </div>

            {#if showCalculation}
                <div class="pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 border-2
                border-black rounded-2xl bg-slate-300 font-mono font-bold">
                    {calculationResult}
                </div>
            {:else if showError}
                <div class="pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 border-2
                border-black rounded-2xl bg-red-300 font-mono font-bold">
                    {calculationResult}
                </div>
            {/if}

        </div>
    </div>

    <!-- (spacer for symmetry) -->
    <div class="w-24"></div>

</div>
