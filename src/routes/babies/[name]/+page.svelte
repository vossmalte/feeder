<script>
	import { firestore } from '$lib/firebase';
	import { collectionStore, Doc, docStore } from 'sveltefire';
	export let data;

	$: console.log(data);

	const feedings = collectionStore(firestore, `babies/${data.name}/feedings`);
</script>

<Doc ref={'babies/' + data.name} let:data>
	<h1>
		{data?.name}
	</h1>
	<a href="./addFeeding">Neue Runde</a>
</Doc>
