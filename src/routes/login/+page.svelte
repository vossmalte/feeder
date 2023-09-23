<script>
	import { SignedOut, SignedIn } from 'sveltefire';
	import Login from '$lib/components/Login.svelte';
</script>

<SignedOut let:auth>
	<Login {auth} />
</SignedOut>

<SignedIn let:user let:signOut>
	Willkommen, {user.email}
	<a href="/">Uebersicht</a>
	<button on:click={signOut}>Abmelden</button>
</SignedIn>
