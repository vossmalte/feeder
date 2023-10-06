<script lang="ts">
	import { feedingEmojies } from '$lib/emojify';
	import { firestore } from '$lib/firebase';
	import { feedingCaptions, feedingUnits } from '$lib/intl';
	import {
		deleteDoc,
		limit,
		orderBy,
		query,
		type CollectionReference,
		type DocumentData
	} from 'firebase/firestore';
	import { flip } from 'svelte/animate';
	import { derived, type Readable } from 'svelte/store';
	import { collectionStore } from 'sveltefire';

	export let feedingsCollection: CollectionReference;
	export let numberOfRounds = Number.POSITIVE_INFINITY;

	const q = query(
		feedingsCollection,
		orderBy('datetime', 'desc'),
		limit(numberOfRounds * feedingTypes.length)
	);
	const feedings = collectionStore(firestore, q);

	//derived<Readable<DocumentData[]>, Map<string, DocumentData[]>>
	const groupedFeedings = derived<Readable<DocumentData[]>, DocumentData[][]>(
		feedings as Readable<DocumentData[]>,
		($feedings, set) => {
			const map = new Map<string, DocumentData[]>();
			for (const feeding of $feedings) {
				const entries = map.get(feeding.datetime) ?? [];
				map.set(feeding.datetime, [...entries, feeding]);
			}
			set([...map.values()]);
		}
	);

	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { feedingTypes } from '$lib/types';
	export const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
			};
		}
	});

	function deleteActivity(activity: DocumentData) {
		deleteDoc(activity.ref);
	}
</script>

<ul class="rounds">
	{#each $groupedFeedings.filter((_, index) => index < numberOfRounds) as round}
		<li>
			<h3>
				<a href="?datetime={round[0].datetime}">
					{new Date(round[0].datetime).toLocaleString('de', {
						weekday: 'short',
						day: 'numeric',
						month: 'numeric',
						hour: 'numeric',
						minute: 'numeric'
					})}</a
				>
			</h3>
			<ul>
				{#each round as activity (activity.id)}
					<li in:receive={{ key: activity.id }} out:send={{ key: activity.id }} animate:flip>
						{feedingEmojies[activity.type]}
						{activity?.quantity ?? activity?.comment ?? ''}{feedingUnits[activity.type]}
						{feedingCaptions[activity.type]}
						<!--TODO: the delete UX should be improved by a lot. e.g.: click on a datetime and have it selected above to quickly edit those entries via FeedingButtons -->
						<button on:click={() => deleteActivity(activity)}>🗑</button>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	ul > li > ul {
		padding: 0;
	}
	ul > li > ul > li {
		list-style: none;
	}
	h3 {
		margin-bottom: 2px;
	}
	.rounds {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	h3 {
		margin: 0;
	}
	button {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
</style>
