<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { auth, firestore, storage } from '../lib/firebase';
	import '$lib/css-reset.css';

	import { SignedIn, SignedOut } from 'sveltefire';
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<nav>
		<a href="/login">Benutzer</a>
		<SignedIn>y</SignedIn>
		<SignedOut>n</SignedOut>
	</nav>
	<main>
		<slot />
	</main>
</FirebaseApp>

<style global>
	div {
		font-family: sans-serif;
	}
	main {
		display: flex;
		flex-direction: column;
	}
</style>
