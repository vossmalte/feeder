import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { dev } from '$app/environment';
import { getStorage } from 'firebase/storage';
// Initialize Firebase
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

	appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const db = getFirestore();
dev && connectFirestoreEmulator(db, '127.0.0.1', 8080);
export const storage = getStorage(app);
export const auth = getAuth(app);
