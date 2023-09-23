import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// Initialize Firebase
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

	projectId: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

	appId: import.meta.env.VITE_FIREBASE_APP_ID
};
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
