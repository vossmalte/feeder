<script lang="ts">
	import { firestore } from '$lib/firebase';
	import type {
		Feeding,
		FeedingType,
		FeedingWithTimestamp,
		QuantifiedFeedingType
	} from '$lib/types';
	import { feedingTypes, assertUnreachable } from '$lib/types';
	import { addDoc, limit, orderBy, query, type CollectionReference } from 'firebase/firestore';
	import { collectionStore } from 'sveltefire';
	import FeedingButton from './FeedingButton.svelte';
	import FeedingDialog from './FeedingDialog.svelte';

	export let feedingsCollection: CollectionReference;

	// this format matches datetime-local picker...
	let datetime = new Date()
		.toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' })
		.replace(' ', 'T');

	let feedingTypeForModal: QuantifiedFeedingType | 'comment' | undefined = undefined;

	const latestAction = collectionStore(
		firestore,
		query(feedingsCollection, orderBy('datetime', 'desc'), limit(1))
	);

	function addFeeding(feeding: Feeding) {
		// TODO:  maybe use a converter to have this typed niceley
		// TODO: we probably also want to save the author...
		const f: FeedingWithTimestamp = { ...feeding, datetime };
		addDoc(feedingsCollection, f);
	}

	function clickHandler(e: CustomEvent<FeedingType>) {
		switch (e.detail) {
			case 'poo':
			case 'iron':
			case 'vitamin':
			case 'hair':
			case 'pamper':
				addFeeding({ type: e.detail });
				break;
			case 'pdf':
			case 'breastMilk':
			case 'breastfeed':
			case 'comment':
			case 'temperature':
				// opens dialog
				feedingTypeForModal = e.detail;
				break;
			default:
				assertUnreachable(e.detail);
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
	{#each feedingTypes as feedingType}
		<li>
			<FeedingButton {datetime} {feedingType} {feedingsCollection} on:click={clickHandler} />
		</li>
	{/each}
</ul>
{#if feedingTypeForModal !== undefined}
	<FeedingDialog bind:feedingType={feedingTypeForModal} on:submit={(e) => addFeeding(e.detail)} />
{/if}

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 4px;
		padding: 0;
	}
	li {
		list-style-type: none;
	}
</style>
