<script lang="ts">
	import { feedingEmojies } from '$lib/emojify';
	import { firestore } from '$lib/firebase';
	import { feedingCaptions, feedingUnits } from '$lib/intl';
	import {
		deleteDoc,
		orderBy,
		query,
		type CollectionReference,
		type DocumentData
	} from 'firebase/firestore';
	import { derived, type Readable } from 'svelte/store';
	import { collectionStore } from 'sveltefire';

	export let feedingsCollection: CollectionReference;

	const q = query(feedingsCollection, orderBy('datetime', 'desc'));
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

	function deleteActivity(activity: DocumentData) {
		deleteDoc(activity.ref)
	}
</script>

<h2>Letzte Aktionen</h2>
<ul class="rounds">
	{#each $groupedFeedings as round}
		<li>
			<h3>
				{new Date(round[0].datetime).toLocaleString('de', {
					weekday: 'short',
					day: 'numeric',
					month: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}
			</h3>
			{#each round as activity}
				<ul>
					<li>
						{feedingEmojies[activity.type]}
						{activity?.quantity ?? ''}{feedingUnits[activity.type]}
						{feedingCaptions[activity.type]}
						<button on:click={() => deleteActivity(activity)}>x</button>
					</li>
				</ul>
			{/each}
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
</style>
