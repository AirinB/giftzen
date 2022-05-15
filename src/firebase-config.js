// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
const { initializeAppCheck, ReCaptchaV3Provider } = require('firebase/app-check');

// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN;
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// B3BD387A-A31C-45A2-8991-94BE80170C11
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdWkfAfAAAAAJrYW-yjc8azlKE-HXiVb6YCNRCN'),
  isTokenAutoRefreshEnabled: true,
});
// const analytics = getAnalytics(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
export const auth = getAuth(app);
export const database = getDatabase(app);

// databaseURL: "https://giftzen-default-rtdb.europe-west1.firebasedatabase.app",
