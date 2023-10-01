import { firestore } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return getDoc(doc(firestore, 'babies', params.name)).then((babyDocument) => {
		if (!babyDocument.exists()) {
			// throw redirect(300, '/');
			throw error(404, { message: 'Not found' });
		}
		return { name: params.name };
	});
};
