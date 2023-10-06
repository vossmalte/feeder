<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { auth, firestore, storage } from '../lib/firebase';
	import '../lib/css-reset.css';

	import { SignedIn, SignedOut } from 'sveltefire';
	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>
<FirebaseApp {auth} {firestore} {storage}>
	<nav>
		<span>
			<a href="/">🏠 Übersicht</a>
		</span>
		<span>
			<a href="/login">Benutzer</a>
			<SignedIn>y</SignedIn>
			<SignedOut>n</SignedOut>
		</span>
	</nav>
	<main>
		<SignedIn>
			<slot />
		</SignedIn>
		<SignedOut>
			<a href="/login">Anmelden</a> um die Anwendung zu verwenden.
		</SignedOut>
	</main>
</FirebaseApp>

<style global>
	main {
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
	}
	nav {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
