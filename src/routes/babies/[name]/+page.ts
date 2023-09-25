import { firestore } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return getDoc(doc(firestore, 'babies', params.name))
		.then((babyDocument) => {
			if (!babyDocument.exists()) return error(404,{message:'Not found'});
			return params
		})
		.catch((e) => {
			console.log({ e });
			error(500);
		});
};
