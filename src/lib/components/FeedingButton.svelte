<script lang="ts">
	export let feedingType: FeedingType;
	export let feedingsCollection: CollectionReference;
	export let datetime: string;

	import { feedingEmojies } from '$lib/emojify';
	import { feedingCaptions, feedingUnits } from '$lib/intl';
	import { firestore } from '$lib/firebase';
	import type { FeedingType } from '$lib/types';
	import { CollectionReference, limit, orderBy, query, where } from 'firebase/firestore';
	import { createEventDispatcher } from 'svelte';
	import { collectionStore } from 'sveltefire';

	const dispatch = createEventDispatcher<{ click: FeedingType }>();

	function click() {
		dispatch('click', feedingType);
	}

	const mostRecentAction = collectionStore(
		firestore,
		query(
			feedingsCollection,
			where('type', '==', feedingType),
			orderBy('datetime', 'desc'),
			limit(1)
		)
	);
	const actionOfThisRoundStore = collectionStore(
		firestore,
		query(
			feedingsCollection,
			where('datetime', '==', datetime),
			where('type', '==', feedingType),
			limit(1)
		)
	);
	$: actionOfThisRound = $actionOfThisRoundStore.length === 1 && $actionOfThisRoundStore[0];
	$: renderedAction = actionOfThisRound || $mostRecentAction[0];
	$: hoursSinceLast =
		Math.round(
			(new Date().getTime() - new Date($mostRecentAction[0]?.datetime).getTime()) / 360000.0
		) / 10.0;
</script>

<label>
	<h3>{feedingCaptions[feedingType]}</h3>
	<button on:click={click} disabled={!!actionOfThisRound}>{feedingEmojies[feedingType]}</button>
	<span>
		{#if !actionOfThisRound}
			vor {hoursSinceLast > -1 ? hoursSinceLast : '♾️'}h:
		{/if}
		{renderedAction?.quantity ?? renderedAction?.comment ?? '✅'}{feedingUnits[
			renderedAction?.type ?? 'poo'
		]}
	</span>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: mediumseagreen;
		aspect-ratio: 1;
		justify-content: center;
		user-select: none;
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
	span {
		color: lightgrey;
	}
</style>
