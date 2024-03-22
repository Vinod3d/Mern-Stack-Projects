// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-e5643.firebaseapp.com",
  projectId: "mern-auth-e5643",
  storageBucket: "mern-auth-e5643.appspot.com",
  messagingSenderId: "982833709484",
  appId: "1:982833709484:web:2286d1fc6e8e57e58d7a09",
  measurementId: "G-5VMVXB0CV2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);