import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyClVcmLhr91j8b6nlVWIQ4W3hZh4HYdsck",
  authDomain: "unicornos-staging.firebaseapp.com",
  projectId: "unicornos-staging",
  storageBucket: "unicornos-staging.appspot.com",
  messagingSenderId: "1053657933201",
  appId: "1:1053657933201:web:c9a0cdaccaf42bc43ce630",
  measurementId: "G-2V5XM0M3B3",
  databaseURL: "https://unicornos-staging-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };