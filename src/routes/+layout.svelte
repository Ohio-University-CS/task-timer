<script>
  import { createBrowserClient } from '@supabase/ssr'
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'
  import { invalidate } from '$app/navigation'
  import { setContext } from 'svelte'
  import logo from '$lib/assets/coffee.jpg'
  import Nav from '$lib/Navbar.svelte'
  import "./layout.css"

  let { data, children } = $props()
  let user = $derived(data.user)

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  setContext('supabase', supabase)

  $effect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      invalidate('supabase:auth')
    })
    return () => subscription.unsubscribe()
  })
</script>

<svelte:head><link rel="icon" href={logo} /></svelte:head>

<Nav loggedIn={user ? true : false}></Nav>

<div class="min-h-screen w-screen bg-gray-100">
	{@render children()}
</div>

