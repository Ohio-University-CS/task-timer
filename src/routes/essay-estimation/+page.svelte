<script>
    let pageCount = $state();
    let citationCount = $state(0);
    let confidence = $state();
    let estimation = $state();

    const validInput = $derived(Number.isFinite(pageCount) && Number.isFinite(citationCount) && Number.isFinite(confidence));

    function minutesToHours(estimation)
    {
        let hours = 0;

        while (estimation - 60 >= 0)
        {
            hours++;
            estimation -= 60;
        }

        let plural = '';
        
        if (hours !== 1) { plural = 's'; }

        if (estimation === 0) { return "(" + hours + " hour" + plural + ")."; }
        return "(" + hours + " hour" + plural + " and " + estimation + " minutes).";
    }

    function estimateTime(pageCount, confidence, citationCount = 0) 
    {
        confidence = confidence / 100;

        // ~250 words per page on average (double-spaced, 12 point font, Times New Roman)
        const length = 250 * pageCount;

        // Ensure confidence is in the bounds of 1% to 100%
        confidence = Math.max(0.01, Math.min(confidence, 1));

        // Planning time for the essay depends on the user's confidence
        const planning = 50 * (1 - confidence);

        // Assuming it takes ~8 minutes to find a good citation on average (user confidence = 0.5)
        const research = (citationCount * (15 * (1 - confidence))) + (5 * Math.sqrt(citationCount));

        // Assuming in essay writing, someone who is thinking through their sentences writes 100 words in ~12 minutes
        const rough_draft = (length / 100) * 12;
        const revision = rough_draft * 0.35;

        const base_time = planning + research + rough_draft + revision;
        const confidence_factor = Math.exp(0.5 * (0.5 - confidence));
        const expected_time = Math.round(base_time * confidence_factor);

        // This will return a best case and worst case range along with expected time
        const best_case = Math.round(expected_time * 0.8);
        const worst_case = Math.round(expected_time * 1.2);

        console.log([best_case, expected_time, worst_case]);

        estimation = [best_case, expected_time, worst_case];
        return estimation;
    }
</script>

<div class="min-h-screen bg-[#e3dff2] px-2 sm:px-0 overflow-x-hidden flex flex-col items-center">

    <div class="px-2 py-2 mt-10 sm:mt-28 h-auto sm:h-20 w-full sm:w-3/5 bg-[#c4a1ff] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] flex items-center justify-center text-center">
        <p class="text-xl sm:text-2xl font-mono font-extrabold">
        Essay Time Estimation
        </p>
    </div>

    <div class="p-4 w-full sm:w-3/5 bg-[#bafcf2] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center text-center">
    
        <p class="text-xl font-mono mb-4 font-bold">
            Please provide some information about your essay in the boxes below. We need the following information:
        </p>

        <div class="text-left">
            <p class="text-xl font-mono">
                <b>Page Count:</b> How many pages your essay is expected to be.<br><br>
                <b>Citation Count:</b> How many citations your essay requires (can be 0).<br><br>
                <b>Confidence:</b> Your familiarity with essay material, ranging from 0-100%.
            </p>

            <div class="w-full grid grid-cols-1 mt-10 sm:grid-cols-3 gap-4 text-center">
        
                <div class="flex flex-col">
                    <p class="font-mono mb-1"><b>Page Count</b></p>
                    <input type="number" class="border-2 border-black rounded px-2 py-1 w-full" placeholder=0 bind:value={pageCount}>
                </div>

                <div class="flex flex-col">
                    <p class="font-mono mb-1"><b>Citation Count (0 default)</b></p>
                    <input type="number" class="border-2 border-black rounded px-2 py-1 w-full" placeholder=0 bind:value={citationCount}>
                </div>

                <div class="flex flex-col">
                    <p class="font-mono mb-1"><b>Confidence (%)</b></p>
                    <input type="number" class="border-2 border-black rounded px-2 py-1 w-full" placeholder=0-100% bind:value={confidence}>
                </div>
            </div>

            {#if validInput}
                <div class="flex justify-center mt-6">
                    <button 
                        onclick={() => estimateTime(pageCount, confidence, citationCount)}
                        class="px-8 sm:px-10 py-2 shadow-[4px_4px_0px_0px_#000] border-2 hover:shadow-[6px_6px_0px_0px_#000] 
                        hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer border-black rounded-2xl bg-sky-100 font-mono font-bold text-2xl sm:text-2xl w-full">
                        Submit
                    </button>
                </div>

            {:else}
                <div class="flex justify-center mt-6">
                    <div class="px-8 sm:px-10 py-2 shadow-[4px_4px_0px_0px_#000] border-2
                        border-gray-600 rounded-2xl font-mono font-bold text-2xl sm:text-2xl text-gray-600 w-full text-center">
                        Submit
                    </div>
                </div>
            {/if}
        </div>
    </div>

    {#if estimation}
        <div class="p-1.5 w-full sm:w-3/5 bg-[#fcdce1] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] flex flex-col items-center text-center">
            <p class="text-xl font-mono mb-4">
                Your essay is expected to take between:<br>
                <b>{estimation[0]}-{estimation[2]} minutes<br>
                {#if estimation[1] >= 60} 
                    Expected Time: {estimation[1]} minutes
                    {minutesToHours(estimation[1])}
                {:else}
                    Expected Time: {estimation[1]} minutes.
                {/if}</b>
            </p>
        </div>
    {/if}
</div>