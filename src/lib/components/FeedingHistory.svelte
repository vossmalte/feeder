<script lang="ts">
	import { feedingEmojies } from '$lib/emojify';
	import { firestore } from '$lib/firebase';
	import { orderBy, query, type CollectionReference } from 'firebase/firestore';
	import { collectionStore } from 'sveltefire';

	export let feedingsCollection: CollectionReference;

	const q = query(feedingsCollection, orderBy('datetime', 'desc'));
	const feedings = collectionStore(firestore, q);
</script>

<h2>Letzte Aktionen</h2>
<ul>
	{#each $feedings as feeding}
		<li>{feedingEmojies[feeding.type]} {feeding.datetime}</li>
	{/each}
</ul>
