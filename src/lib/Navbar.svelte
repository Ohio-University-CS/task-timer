<script>
	import NavItem from './NavbarItem.svelte';
	import NavbarDropdown from './NavbarDropdown.svelte';
	import logo from '$lib/assets/coffee.jpg';
  	import { page } from '$app/state';

	let { loggedIn } = $props();

	let currentPath = $derived(page.url.pathname)
</script>

<div class="flex flex-row items-stretch justify-between p-1.5 border-b border-b-gray-500 fixed top-0 left-0 right-0 z-50">
	<a href="/">
		<div class="flex flex-row items-center">
			<img src={logo} alt="Placeholder" class="flex-1 h-15 w-auto rounded-2xl" />
			<p class="ml-1">Task Timer</p>
		</div>
	</a>
	

	<div class="flex flex-row">
		<NavItem href="/" text="Home" selected={currentPath == "/" || currentPath == "/login"}></NavItem>
		{#if loggedIn}
			<NavItem href="/grade-calculator" text="Grade Calculator" selected={currentPath == "/grade-calculator"}></NavItem>
			<NavItem href="/caffeine-calculator" text="Coffee!" selected={currentPath == "/caffeine-calculator"}></NavItem>
			<!-- <NavItem href="/settings" text="Settings" selected={currentPath == "/settings"}></NavItem> -->
		{/if}
		<NavbarDropdown buttonText="Time Estimator" options={[
			{ label: "Assignment Time Estimator", href: "/time-estimation" },
			{ label: "Essay Time Estimator", href: "/essay-estimation" }
		]}></NavbarDropdown>
	</div>

	{#if !loggedIn}
		<NavItem href="/sign-up" text="Sign Up" selected={currentPath == "/sign-up"}></NavItem>
	{:else}
		<NavItem href="/settings" text="Profile" selected={currentPath == "/settings"}></NavItem>
	{/if}


	
</div>