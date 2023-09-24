<script lang="ts">
	import { firestore } from '$lib/firebase';
	import type { Feeding, FeedingType, FeedingWithTimestamp } from '$lib/types';
	import { addDoc, limit, orderBy, query, type CollectionReference } from 'firebase/firestore';
	import { collectionStore } from 'sveltefire';
	import FeedingButton from './FeedingButton.svelte';

	export let feedingsCollection: CollectionReference;

	// this format matches datetime-local picker...
	let datetime = new Date()
		.toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' })
		.replace(' ', 'T');

	const latestAction = collectionStore(
		firestore,
		query(feedingsCollection, orderBy('datetime'), limit(1))
	);

	function addFeeding(feeding: Feeding) {
		// TODO:  maybe use a converter to have this typed niceley
		const f: FeedingWithTimestamp = { ...feeding, datetime };
		addDoc(feedingsCollection, f);
	}

	let addPdf = (quantity: number) => addFeeding({ type: 'pdf', quantity });

	function clickHandler(e: CustomEvent<FeedingType>) {
		switch (e.detail) {
			case 'poo':
				addFeeding({ type: 'poo' });
				break;
			case 'pdf':
				// TODO: open dialog to enter number
				console.log('open dialog for ' + e.detail);
		}
	}
</script>

<input type="datetime-local" bind:value={datetime} lang="sv-SE" />
<button
	on:click={() => {
		datetime = $latestAction[0]?.datetime ?? datetime;
	}}>↻</button
>
<ul>
	<li>
		<FeedingButton feedingType="poo" {feedingsCollection} on:click={clickHandler} />
	</li>
	<li>
		<FeedingButton feedingType="pdf" {feedingsCollection} on:click={clickHandler} />
	</li>
</ul>
