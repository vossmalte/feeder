<script lang="ts">
	import type { Feeding } from '$lib/types';
	import FeedingForm from '$lib/components/FeedingForm.svelte';

	export let data;

	// this format matches datetime-local picker...
	const datetime = new Date().toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' });

	const newFeedingData: Feeding = { datetime, breastMilk: undefined, pdf: undefined };
	function saveNewFeeding(event: CustomEvent<Feeding>) {
		console.log(event.detail);
	}
</script>

<FeedingForm {...newFeedingData} on:submit={saveNewFeeding} />

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
</style>
