import { firestore } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import type { PageLoad } from './$types';

// don't exec on server because can't access firestore on server...
export const ssr = false;
export const load: PageLoad = ({ params }) => {
	return getDoc(doc(firestore, 'babies', params.name)).then((babyDocument) => {
		if (!babyDocument.exists()) {
			// throw redirect(300, '/');
			throw error(404, { message: 'Not found' });
		}
		return { name: params.name };
	});
};
