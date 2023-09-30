<script>
	import FeedingHistory from '$lib/components/FeedingHistory.svelte';
	import { firestore } from '$lib/firebase';
	import { collection } from 'firebase/firestore';
	import { collectionStore } from 'sveltefire';
	const babies = collectionStore(firestore, 'babies');
</script>

<ul>
	{#each $babies as baby}
		<li>
			<h1>
				<a href={'/babies/' + baby.id}>{baby.name}</a>
			</h1>
			<FeedingHistory
				feedingsCollection={collection(firestore, `babies/${baby.id}/feedings`)}
				numberOfRounds={1}
			/>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin: 0;
	}
</style>
