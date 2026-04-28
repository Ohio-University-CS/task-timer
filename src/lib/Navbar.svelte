<script>
	import NavItem from './NavbarItem.svelte';
	import NavbarDropdown from './NavbarDropdown.svelte';
	import logo from '$lib/assets/coffee.jpg';
</script>

<div class="flex flex-row items-center justify-between p-1.5 border-b border-b-gray-500 fixed top-0 left-0 right-0 z-50">
	<a href="/"><img src={logo} alt="Placeholder" class="flex-1 h-20 w-auto rounded-2xl" /></a>

	<div class="flex flex-row">
		<NavItem href="/" text="Tasks"></NavItem>
		<NavItem href="/grade-calculator" text="Grade Calculator"></NavItem>
		<NavItem href="/caffeine-calculator" text="Coffee!"></NavItem>
		<NavItem href="/settings" text="Settings"></NavItem>
		<NavbarDropdown buttonText="Time Estimator" options={[
			{ label: "Assignment Time Estimator", href: "/time-estimation" },
			{ label: "Essay Time Estimator", href: "/essay-estimation" }
		]}></NavbarDropdown>
	</div>

	<NavItem href="/sign-up" text="Sign Up" class="flex-1 justify-end"></NavItem>
</div>