import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

const firebaseConfig = {
  // Your Firebase configuration here
  // Make sure this is correctly filled out
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, push, onValue };