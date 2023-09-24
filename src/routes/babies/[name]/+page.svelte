<script lang="ts">
	import FeedingButtons from '$lib/components/FeedingButtons.svelte';
	import { feedingEmojies } from '$lib/emojify';
	import { firestore } from '$lib/firebase';
	import { collection, query, orderBy } from 'firebase/firestore';
	import { Collection, Doc } from 'sveltefire';
	export let data;

	const collectionPath = `babies/${data.name}/feedings`;
	const collectionRef = collection(firestore, collectionPath);
	const q = query(collectionRef, orderBy('datetime', 'desc'));
	const feedingsCollection = collection(firestore, collectionPath);
</script>

<Doc ref={'babies/' + data.name} let:data>
	<h1>
		{data?.name}
	</h1>
</Doc>

<FeedingButtons {feedingsCollection} />

<Collection ref={q} let:data>
	<h2>Letzte Aktionen</h2>
	<ul>
		{#each data as feeding}
			<li>{feedingEmojies[feeding.type]} {feeding.datetime}</li>
		{/each}
	</ul></Collection
>
