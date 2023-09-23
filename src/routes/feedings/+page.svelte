<script>
	import { firestore } from '$lib/firebase';
	import { collectionStore } from 'sveltefire';
	const babies = collectionStore(firestore, 'babies');
</script>
  
