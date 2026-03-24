<script>
	import NavItem from './NavbarItem.svelte';
	import logo from '$lib/assets/coffee.jpg'
</script>

<div class="flex flex-row items-center justify-between p-1.5 border-b border-b-gray-500">
	<a href="/"><img src={logo} alt="Placeholder" class="flex-1 h-20 w-auto" /></a>

	<div class="flex flex-row">
		<NavItem href="/" text="Tasks"></NavItem>
		<NavItem href="/settings" text="Settings"></NavItem>
		<NavItem href="/caffeine-calculator" text="Coffee!"></NavItem>
	</div>

	<NavItem href="/sign-up" text="Sign Up" class="flex-1 justify-end"></NavItem>
</div>