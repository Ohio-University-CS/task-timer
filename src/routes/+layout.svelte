<script>
	import './layout.css';
	import logo from '$lib/assets/coffee.jpg';
	import Nav from '$lib/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={logo} /></svelte:head>

<Nav></Nav>

<div class="flex w-screen h-screen justify-center items-center bg-gray-100">
	{@render children()}
</div>

