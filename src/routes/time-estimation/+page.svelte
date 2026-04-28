<script>
    import { goto } from '$app/navigation';

    let file = $state();
    let fileInput = $state();
    let { form } = $props();

    let subject = $state(null);
    let confidence = $state(null);
    let estimation = $state(null);

    // Heuristic method of filtering questions
    const questionWords = [
    "solve", "find", "calculate", "compute", "evaluate", "simplify", "determine", "estimate", "make",
    "explain", "justify", "prove", "show", "demonstrate", "derive", "integrate", "infer", "inference",
    "analyze", "discuss", "describe", "compare", "contrast", "summarize", "interpret", "provide",
    "define", "identify", "classify", "illustrate", "label", "list", "give", "apply"];

    function uploadFile()
    {
        fileInput.click();
    }

    function handleChange(event) 
    {
        file = event.target.files[0];
    }

    let showDropdown = $state(false);
    const menuOptions = ["Math", "Chemistry", "Physics", "Biology", "Programming", "Essay", "Other"];

    function toggleDropdown()
    {
        showDropdown = !showDropdown;
    }

    function selectOption(option)
    {
        subject = option.toLowerCase();
        showDropdown = false;

        if (subject === "essay") {
            goto('/essay-estimation')
        }
    }

    /* This is the function that will format a given PDF, placing every sentence on its own line.
       It's pretty reliable but not perfect, as some weird edge cases can slightly break it, but making this work 
       100% correctly would probably require me to tokenize everything, which would be way overkill for something like this. */
    function parse(pdf) 
    {
        const rules = [

            // Remove PDFParse's page count (-- 1 of 5 --, etc)
            {
                pattern: /-- \d+ of \d+ --/gm,
                replacement: ''
            },

            /* Handle some notable edge cases before sentence splitting.
               This is an undesirable implementation but there's not really a better way of doing this without tokenization */
            {
                pattern: /e\.g\.|i\.e.|a\.m\.|p\.m\.|U\.S\.|U\.K\.|U\.N\.|E\.U\.|D\.C\.|Prof\.|Capt\.|Blvd\./gmi,
                replacement: '{unreadable token}'
            },

            // Join sentence breaks together, ignoring the start of questions
            {
                pattern: /(?<![.!?])\n(?!\n|\d+[\.\)]|[a-zA-Z][\.\)])/gm,
                replacement: ' '
            },

            // Clean up spacing
            {
                pattern: /[ \t]+/gm,
                replacement: ' '
            },

            // Break sentences, ignoring most common 2-3 letter abbreviations, decimals, and domain names
            {
                pattern: /(?<!^\w)(?<![A-Z][a-z])(?<![A-Z][a-z]{2})(?<!www)([\.\?!])(?= )/gm,
                replacement: '$1\n'
            },

            // If necessary, fix question lines on right-aligned PDFs
            {
                pattern: /(?<=\w)([ ])(\w+[\.\)][ \t])/gm,
                replacement: '$1\n$2'
            },

            // Fix jank spacing
            {
                pattern: /\n\s+/gm,
                replacement: '\n'
            }

        ];

        for (const rule of rules) {
            pdf = pdf.replace(rule.pattern, rule.replacement);
        }

        return pdf;
    }

    function isQuestion(line)
    {
        line = line.toLowerCase();

        if (line.includes('?')) return true;

        // Match lines with question numbers (1. a), etc)
        let regex = /^(?:\d{1,2}|[a-zA-Z])[\.:\)][ \t]/m;
        if (regex.test(line)) return true;

        // Check for specific phrases at the beginning of the sentence that would suggest a question
        for (const word of questionWords) {
            const wordRegex = new RegExp(`^\\s*${word}\\b`, 'i');
            if (wordRegex.test(line)) return true;
        }

        return false;
    }

    // This function removes any lines from the PDF not determined a question (instructions, examples, etc)
    function filter(pdf)
    {
        let lines = pdf.split(/\r?\n/);
        let filteredText = '';

        for (const line of lines) {
            if (isQuestion(line)) {
                filteredText += line + '\n';
            }
        }

        return filteredText;
    }

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

    function estimateTime(pdf, subject, confidence)
    {
        if (!pdf || !subject || confidence == null) return null;

        confidence = Number(confidence) / 100;

        // Rough estimate of how long it takes to complete a question
        const avg_time = {
            "math": 4,
            "chemistry": 5,
            "physics": 5,
            "biology": 3,
            "programming": 6,
            "other": 5
        };

        // How much the length of a question is influenced by the user's confidence score, ranging from 0.01 (least confident) to 1 (most confident)
        const confidence_sensitivity = {
            "math": 2.3,
            "chemistry": 2.4,
            "physics": 2.2,
            "biology": 1.8,
            "programming": 2.3,
            "other": 2.0
        };

        // How much mental fatigue affects a question's length (i.e. losing focus later in the assignment)
        const fatigue_sensitivity = {
            "math": 0.06,
            "chemistry": 0.07,
            "physics": 0.06,
            "biology": 0.04,
            "programming": 0.03,
            "other": 0.04
        };
                
        let questionCount = pdf.split('\n').length - 1;

        // Ensure confidence falls between 1% and 100%
        confidence = Math.max(0.01, Math.min(confidence, 0.99));
        questionCount = Math.max(1, questionCount);

        let base_time = 0;

        // Calculate time without considering confidence
        for (let i = 1; i < questionCount + 1; i++) {
            let fatigue_multiplier = 1 + fatigue_sensitivity[subject] * Math.sqrt(i);
            fatigue_multiplier = Math.min(fatigue_multiplier, 1.5);
            base_time += avg_time[subject] * fatigue_multiplier;
        }

        // Factor in confidence to base time
        let confidence_factor = Math.exp(confidence_sensitivity[subject] * (0.5 - confidence));
        confidence_factor = Math.min(Math.max(confidence_factor, 0.25), 2.5);

        const expected_time = Math.round(base_time * confidence_factor);

        /* Since the expected time likely isn't 100% accurate, we will return a range
           best_case: in the case that a student has good focus/questions were easier than expected, they will complete the assignment ~20% faster
           worst_case: in the case a student is unfocused/questions were harder than expected, they will complete the assignment ~20% slower */
        const best_case = Math.round(expected_time * 0.8);
        const worst_case = Math.round(expected_time * 1.2);

        return [best_case, expected_time, worst_case];
    }

    let processedText = $state('');

    $effect(() => {
        if (!form?.text) return;

        const parsed = parse(form.text);
        processedText = filter(parsed);
    });

    $effect(() => {
        if (!form) return;

        if (form.subject !== undefined) {
            subject = form.subject;
        }

        if (form.confidence !== undefined) {
            confidence = form.confidence;
        }
    });

    $effect(() => {
        const s = subject;
        const c = confidence;
        const t = processedText;

        if (!t || !s || c == null) return;

        estimation = estimateTime(t, s, c);
    });

</script>

<div class="min-h-screen bg-[#e3dff2] px-2 sm:px-0 overflow-x-hidden">

    <div class="flex flex-col items-center">

        <div class="px-2 py-2 mt-10 sm:mt-28 h-auto sm:h-20 w-full sm:w-3/5 bg-[#ff8243] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] flex items-center justify-center text-center">
            <p class="text-xl sm:text-2xl font-mono font-extrabold">
            Assignment Time Estimation
            </p>
        </div>


        <div class="w-full sm:w-3/5 flex flex-col lg:flex-row mt-4 sm:mt-0">
            
            <div class="w-full lg:w-1/2 bg-[#fcdce1] border-2 border-black rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none shadow-[4px_4px_0px_0px_#000]">
                <p class="text-base sm:text-xl font-mono px-4 sm:px-6 pt-4 sm:pt-2.5 pb-4">
                    <b>Need help with time management?</b> <br><br>
                    Drop in a PDF of your homework assignment to receive a time estimation!<br><br>

                    <b><u>Subject:</u></b><br>
                    The subject of your assignment (math, chemistry, etc).<br><br>

                    <b><u>Confidence Level:</u></b><br>
                    Your confidence on the assignment, ranging from 0% to 100%.<br><br>

                    Need help on an essay? Go
                    <a href="/essay-estimation" class="underline font-bold hover:text-blue-700">
                        HERE!
                    </a>
                </p>
            </div>

            <div class="w-full lg:w-1/2 flex flex-col">

                <div class="bg-[#fdfd96] border-2 border-black border-t-0 lg:border-l-0 lg:border-t-2 lg:rounded-tr-2xl shadow-[4px_4px_0px_0px_#000]">

                    <div class="grid grid-cols-[auto_1fr] items-center gap-3 px-4 sm:px-6 pt-6 sm:pt-14">
                        <b class="text-lg sm:text-xl font-mono">Subject:</b>

                        <div class="relative w-full max-w-55">
                            <div class="h-10 bg-[#c4a1ff] border-2 border-black flex justify-between items-center px-2">
                                {#if subject === null}
                                    <p class="text-gray-600 font-mono text-sm sm:text-base">Select Subject</p>
                                {:else}
                                    <p class="font-mono text-sm sm:text-base">{subject}</p>
                                {/if}

                                {#if !estimation}
                                    <button class="text-2xl" onclick={toggleDropdown}>&#8615;</button>
                                {/if}
                            </div>

                            {#if showDropdown}
                                <div class="absolute left-0 top-full w-full z-50 bg-sky-100 border-2 border-black">
                                    {#each menuOptions as option}
                                        <button
                                            type="button"
                                            class="w-full text-left p-2 hover:bg-gray-200 border-b-2 last:border-b-0 border-black font-mono"
                                            onclick={() => selectOption(option)}
                                        >
                                            {option}
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="grid grid-cols-[auto_1fr] items-center gap-3 px-4 sm:px-6 pt-6 sm:pt-18">
                        <b class="text-lg sm:text-xl font-mono">Confidence:</b>

                        <div class="h-10 w-full max-w-35 bg-[#c4a1ff] border-2 border-black flex items-center px-2 focus-within:ring-2 focus-within:ring-black">
                            <input 
                            type="number"
                            min="0"
                            max="100"
                            bind:value={confidence}
                            placeholder="0-100%"
                            class="w-full bg-transparent outline-none border-none p-0 m-0 placeholder-gray-600 font-mono text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <input 
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        bind:value={confidence}
                        class="w-3/4 sm:w-1/2 mt-6 mx-auto block accent-black"
                    />
                </div>
                
                <div class="bg-[#bafcf2] border-2 border-black border-t-0 lg:border-l-0 lg:rounded-br-2xl shadow-[4px_4px_0px_0px_#000] flex flex-col min-h-62.5 sm:min-h-75">

                    <div class="flex-1 flex items-center justify-center p-3">
                        {#if estimation}
                            <div class="p-2 bg-white border-2 border-black rounded-xl font-mono text-center text-sm sm:text-base">
                                <p>
                                    Your assignment is expected to take between:<br>
                                    <b>{estimation[0]}-{estimation[2]} minutes<br>
                                    {#if estimation[1] >= 60} 
                                        Expected Time: {estimation[1]} minutes
                                        {minutesToHours(estimation[1])}
                                    {:else}
                                        Expected Time: {estimation[1]} minutes.
                                    {/if}</b>
                                </p>
                            </div>
                        {:else if file}
                            <div class="p-2 bg-white border-2 border-black rounded-xl font-mono text-center text-sm sm:text-base">
                                <p>{file.name}</p>
                            </div>
                        {/if}
                    </div>

                    <form 
                        method="post" 
                        enctype="multipart/form-data" 
                        class="mt-auto flex flex-col sm:flex-row justify-center items-center gap-3 p-3">

                        <input type="hidden" name="subject" bind:value={subject} />
                        <input type="hidden" name="confidence" bind:value={confidence} />

                        <input 
                            type="file" 
                            name="file" 
                            accept=".pdf" 
                            bind:this={fileInput} 
                            onchange={handleChange} 
                            class="hidden"
                        />

                        {#if estimation}
                            <button 
                                type="submit"
                                class="px-8 sm:px-10 py-2 mb-2 sm:mb-6 shadow-[4px_4px_0px_0px_#000] border-2 hover:shadow-[6px_6px_0px_0px_#000] 
                                hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer border-black rounded-2xl bg-slate-300 font-mono font-bold text-lg sm:text-xl">
                                Reset
                            </button>
                        
                        {:else}
                            <button
                                type="button" 
                                onclick={uploadFile} 
                                class="px-8 sm:px-10 py-2 mb-2 sm:mb-6 shadow-[4px_4px_0px_0px_#000] border-2 hover:shadow-[6px_6px_0px_0px_#000] 
                                hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer border-black rounded-2xl bg-slate-300 font-mono font-bold text-lg sm:text-xl">
                                Upload File
                            </button>
                        {/if}
                    
                        {#if file && subject && confidence != null}
                            <button 
                                type="submit"
                                class="px-8 sm:px-10 py-2 mb-2 sm:mb-6 shadow-[4px_4px_0px_0px_#000] border-2 hover:shadow-[6px_6px_0px_0px_#000] 
                                hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer border-black rounded-2xl bg-slate-300 font-mono font-bold text-lg sm:text-xl">
                                Submit
                            </button>

                        {:else}
                            <div 
                                class="px-8 sm:px-10 py-2 mb-2 sm:mb-6 shadow-[4px_4px_0px_0px_#000] border-2
                                border-gray-600 rounded-2xl font-mono font-bold text-lg sm:text-xl text-gray-600">
                                Submit
                            </div>
                        {/if}

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>