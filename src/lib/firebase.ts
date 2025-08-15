// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "abs-build",
  appId: "1:254937340843:web:49bfffc3097a5d1547d0ee",
  storageBucket: "abs-build.firebasestorage.app",
  apiKey: "AIzaSyCMfneSxUnvaIRKZqdIY5m3wksLGjRIRac",
  authDomain: "abs-build.firebaseapp.com",
  messagingSenderId: "254937340843",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
