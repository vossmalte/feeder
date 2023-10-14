<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type {
		Feeding,
		FeedingType,
		FeedingWithTimestamp,
		QuantifiedFeedingType
	} from '$lib/types';
	import { feedingTypes, assertUnreachable } from '$lib/types';
	import {
		addDoc,
		getDocs,
		limit,
		orderBy,
		query,
		type CollectionReference
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import FeedingButton from './FeedingButton.svelte';
	import FeedingDialog from './FeedingDialog.svelte';

	export let feedingsCollection: CollectionReference;

	let [date, time] = ($page.url.searchParams.get('datetime') ?? 'T').split('T');
	$: datetime = `${date}T${time}`;
	onMount(() => {
		getDocs(query(feedingsCollection, orderBy('datetime', 'desc'), limit(1))).then(
			// set to latest round if not provided yet
			(feedings) => {
				date ||= feedings.docs[0].get('datetime').split('T')[0];
				time ||= feedings.docs[0].get('datetime').split('T')[1];
			}
		);
	});

	// only on client: sync datetime to url
	$: if (browser) goto('?datetime=' + datetime, { replaceState: true });

	let feedingTypeForModal: QuantifiedFeedingType | 'comment' | undefined = undefined;

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

<input type="date" value={date} on:focusout={(e) => (date = e.currentTarget?.value)} lang="sv-SE" />
<input type="time" value={time} on:focusout={(e) => (time = e.currentTarget?.value)} lang="sv-SE" />
<button
	on:click={() => {
		datetime = new Date()
			.toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' })
			.replace(' ', 'T');
	}}>🆕 Neue Runde</button
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
	input,
	button {
		width: fit-content;
		margin: 4px auto;
	}
	input[type='time'] {
		font-size: 200%;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin: 4px;
		gap: 4px;
		padding: 0;
		margin-top: 8px;
	}
	li {
		list-style-type: none;
	}
</style>
