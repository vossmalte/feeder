<script lang="ts">
	import type { Feeding } from '$lib/types';
	// this format matches datetime-local picker...
	export let datetime: string = '1999-12-3110:10';
	export let breastMilk: number | undefined = undefined;
	export let pdf: number | undefined = undefined;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: Feeding }>();

	function submit() {
		dispatch('submit', { datetime, breastMilk, pdf });
	}
</script>

<form on:submit={submit}>
	<input type="datetime-local" value={datetime} />
	<label>
		Muttermilch (ml)
		<input type="number" placeholder="60" bind:value={breastMilk} />
	</label>
	<label>
		PDF (ml)
		<input type="number" placeholder="70" bind:value={pdf} />
	</label>
	<button type="submit">Speichern</button>
</form>
