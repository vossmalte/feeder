<script lang="ts">
	export let feedingType: FeedingType;
	export let feedingsCollection: CollectionReference;

	import { feedingEmojies } from '$lib/emojify';
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
		query(feedingsCollection, where('type', '==', feedingType), orderBy('datetime','desc'), limit(1))
	);
</script>

<button on:click={click}>{feedingEmojies[feedingType]}</button>⏰ vor {Math.round(
	(new Date().getTime() - new Date($latestAction[0]?.datetime).getTime()) / 360000
) / 10.0 || '♾️'}h
