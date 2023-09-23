import { error } from '@sveltejs/kit';
import type { PageLoad } from './addFeeding/$types';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '$lib/firebase';

export const load: PageLoad = async ({ params }) => {
	return getDoc(doc(firestore, 'babies', params.name))
		.then((babyDocument) => {
			if (!babyDocument.exists()) return error(404, { message: 'Not found' });
			return params;
		})
		.catch((e) => {
			console.log({ e });
			error(500);
		});
};
