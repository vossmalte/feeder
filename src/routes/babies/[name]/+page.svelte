<script lang="ts">
	import FeedingButtons from '$lib/components/FeedingButtons.svelte';
	import FeedingHistory from '$lib/components/FeedingHistory.svelte';
	import { firestore } from '$lib/firebase';
	import { collection } from 'firebase/firestore';
	import { Doc } from 'sveltefire';
	export let data;

	const collectionPath = `babies/${data.name}/feedings`;
	const feedingsCollection = collection(firestore, collectionPath);
</script>

<h1>
	<Doc ref={'babies/' + data.name} let:data>
		Hallo {data?.name}
	</Doc>
</h1>

<FeedingButtons {feedingsCollection} />

<FeedingHistory {feedingsCollection} />

<style>
	h1 {
		position: sticky;
		top: 0;
		opacity: 1;
		background-color: white;
	}
</style>
