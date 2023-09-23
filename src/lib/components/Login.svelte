<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
	export let auth: Auth;

	let email = '';
	let password = '';
</script>

<form
	on:submit={async () => {
		const result = await signInWithEmailAndPassword(auth, email, password);
		redirect(301, '/');
	}}
>
	<input bind:value={email} type="email" placeholder="Email" />
	<input bind:value={password} type="password" placeholder="Passwort" />
	<button type="submit">Einloggen</button>
</form>
