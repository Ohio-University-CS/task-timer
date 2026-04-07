<script>
	//Randomly chosen initial values
	let weight = 120;
	let selectedTask = "Task1";
	let selectedIntake = "Coffee";
	let caffeineNeeded = 0;
	let cupsOfDrink = 0;

	//No use for this yet, but it is being updated
	let avgIntake = null;

	//NEED TO MAKE AN (AI?) ALGORITHM FOR THE MULT CALCULATION BASED OFF OF LABEL
	let tasks = [
		{ title: "Task1", label: "Task 1", mult: 1.5 },
		{ title: "Task2", label: "Task 2", mult: 3 },
		{ title: "Task3", label: "Task 3", mult: 6 }
	];
	let intake = [
		{ title: "Coffee", label: "Cups of Coffee", concentration: 90 },
		{ title: "Redbull", label: "Redbulls", concentration: 111 },
		{ title: "Soda", label: "Cans of Soda", concentration: 40 }
	];

	//Collects the selected task
	$: activeTask = tasks.find(t => t.title === selectedTask);

	//Calculates caffeine needed based off of selected task (VERY SIMPLE FOR NOW)
	$: {
		if (activeTask) {
			caffeineNeeded = Math.round(weight * activeTask.mult);
		} else {
			caffeineNeeded = 0;
		}
	}

	//Finds the current choice of intake
	$: activeCup = intake.find(f => f.title === selectedIntake);

	//Calculates how many cups of their chosen drink they would need
	$: {
		if (activeCup) {
			cupsOfDrink = Number.parseFloat(caffeineNeeded / activeCup.concentration).toFixed(2);
		} else {
			cupsOfDrink = 0;
		}
	}
</script>

<!-- Creates the main background color and stuff -->
<div class="bg-radial-[at_50%_75%] from-[#9a784d] to-[#4a3b28] to-75% w-full min-h-screen flex flex-col items-center justify-center p-4">

	<!-- Formats the box that holds all that important stuff -->
	<div class="w-full max-w-[600px] max-h-[85vh] rounded-2xl overflow-hidden flex flex-col border border-white/10 bg-black/10 backdrop-blur-md mt-20 mb-6 shadow-2xl">

		<!-- Header section: Just shows them what it is and what it does -->
		<div class="p-5 border-b border-white/10 flex flex-col items-center justify-center text-center">
			<h1 class="text-xl font-bold text-white flex items-center gap-2">Caffeine Intake Optimizer</h1>
			<p class="text-stone-300 text-xs mt-0.5">Caffeine intake per task based off of your weight</p>
		</div>

		<!-- Fancy mid section that has the weight drag bar -->
		<div class="p-6 space-y-9 flex-grow overflow-y-auto">

			<!-- More formatting, AI had to teach me about space-y-3 :/ -->
			<div class="space-y-3">

				<!-- Labels and indicates what the drag bar is currently at -->
				<div class="flex justify-between items-end">
					<label for="weight" class="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Body Weight</label>
					<span class="text-3xl font-bold text-amber-400 leading-none">{weight}<span class="text-xs ml-1 text-stone-400 font-sans">lb</span></span>
				</div>

				<!-- The actual drag bar (is that what this is called? Imma go with it anyway) -->
				<input id="weight" type="range" min="100" max="300" bind:value={weight} class="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500" />
			</div>

			<!-- NEED TO MAKE AN INPUT BOX THAT ALLOWS YOU TO TELL HOW MUCH CAFFEINE YOU NORMALLY TAKE AND CALCULATE BASED OFF OF THAT -->

			<!-- Task dropdown: Allows the user to select from their tasks they have -->
			<div class="space-y-3">
				<!-- Just the title :) -->
				<label for="task-select" class="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Task Selector</label>

				<!-- This has all of the tasks with their given label and mult -->
				<!-- It has an ugly blue highlight. Any way to change that? -->
				<div class="relative">
					<select id="task-select" bind:value={selectedTask} class="w-full p-3 bg-white/5 border border-white/10 rounded-lg appearance-none focus:outline-none text-white text-sm font-medium transition-all">
						{#each tasks as task}
							<option value={task.title} class="bg-[#4a3b28] text-white">{task.label} : {task.mult} mg/lb</option>
						{/each}
					</select>
				</div>

			</div>

			<!-- Section that has choice of intake and average amount of caffeine you normally have -->
			<div class="space-y-3 flex flex-col">
				<div class="relative w-full">
					<label for="intake-select" class="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Intake Selector</label>

					<!-- Allows the user to select their preferred method of intake -->
					<div class="flex gap-3">
						<select id="intake-select" bind:value={selectedIntake} class="w-3/4 p-3 bg-white/5 border border-white/10 rounded-lg appearance-none focus:outline-none text-white text-sm font-medium transition-all">
							{#each intake as item}
								<option value={item.title} class="bg-[#4a3b28] text-white">{item.title} : {item.concentration} mg per</option>
							{/each}
						</select>

						<!-- Allows the user to input how much they normally drink in a day -->
						<input type="number" bind:value={avgIntake} class="ml-3 w-full h-12 rounded-lg focus:outline-none bg-white/5 border-white/10 text-white placeholder-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="Average Intake per Day">
					</div>
				</div>
			</div>

		</div>

		<!-- The bottom fancy part. Took a while to make this look good. Styling is so annoying -->
		<div class="bg-black/20 p-6 border-t border-white/10 text-center">

			<!-- Title again x_x -->
			<div class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Recommended Intake</div>

			<!-- The actual calculated amount of caffeine needed. I just have a simple weight * mult factor right now -->
			<div class="text-5xl font-black text-white tracking-tighter">{caffeineNeeded}<span class="text-xl font-light ml-1 text-amber-400/80 uppercase">mg</span></div>

			<div class="text-sm font-black text-amber-400">{cupsOfDrink}<span class="text-xs text-stone-300 pl-1">{activeCup.label}</span></div>

		</div>

	</div>

</div>