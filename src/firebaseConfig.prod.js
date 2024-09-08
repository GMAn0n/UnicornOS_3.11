import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Replace these values with your production Firebase configuration
  apiKey: "YOUR_PRODUCTION_API_KEY",
  authDomain: "your-production-app.firebaseapp.com",
  projectId: "your-production-project-id",
  storageBucket: "your-production-app.appspot.com",
  messagingSenderId: "YOUR_PRODUCTION_MESSAGING_SENDER_ID",
  appId: "YOUR_PRODUCTION_APP_ID",
  measurementId: "YOUR_PRODUCTION_MEASUREMENT_ID",
  databaseURL: "https://your-production-app-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };