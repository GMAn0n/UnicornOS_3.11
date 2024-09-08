import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase configuration here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);