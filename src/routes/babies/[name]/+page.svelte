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

<Doc ref={'babies/' + data.name} let:data>
	<h1>
		{data?.name}
	</h1>
</Doc>

<FeedingButtons {feedingsCollection} />

<FeedingHistory {feedingsCollection} />
