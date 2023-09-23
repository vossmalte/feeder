<script>
	import { firestore } from '$lib/firebase';
	import { collectionStore } from 'sveltefire';
	const babies = collectionStore(firestore, 'babies');
	$: console.log($babies);
</script>

<a href="/feedings">Letzte Eintraege</a>
<ul>
	{#each $babies as baby}
		<li>
			<a href={'/babies/' + baby.id}>{baby.name}</a>
		</li>
	{/each}
</ul>
