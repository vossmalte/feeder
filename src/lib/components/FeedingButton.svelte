<script lang="ts">
	export let feedingType: FeedingType;
	export let feedingsCollection: CollectionReference;
	export let datetime: string;

	import { feedingEmojies } from '$lib/emojify';
	import { feedingCaptions } from '$lib/intl';
	import { firestore } from '$lib/firebase';
	import type { FeedingType } from '$lib/types';
	import { CollectionReference, limit, orderBy, query, where } from 'firebase/firestore';
	import { createEventDispatcher } from 'svelte';
	import { collectionStore } from 'sveltefire';

	const dispatch = createEventDispatcher<{ click: FeedingType }>();

	function click() {
		dispatch('click', feedingType);
	}

	const latestAction = collectionStore(
		firestore,
		query(
			feedingsCollection,
			where('type', '==', feedingType),
			orderBy('datetime', 'desc'),
			limit(1)
		)
	);
	let hoursSinceLast = 0;
	$: hoursSinceLast =
		Math.round((new Date().getTime() - new Date($latestAction[0]?.datetime).getTime()) / 360000.0) /
		10.0;
</script>

<label>
	{feedingCaptions[feedingType]}
	<button on:click={click} disabled={datetime === $latestAction[0]?.datetime}
		>{feedingEmojies[feedingType]}</button
	>⏰ vor {hoursSinceLast > -1 ? hoursSinceLast : '♾️'}h
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: limegreen;
		aspect-ratio: 1;
		justify-content: center;
	}
	label:has(:disabled) {
		background: grey;
	}
	/* TODO: have a color to remind about urgency */
	button {
		background: unset;
		font-size: 200%;
		border: unset;
	}
	label:active:has(:not(:disabled)) {
		translate: 2px 2px;
		opacity: 0.8;
	}
</style>
