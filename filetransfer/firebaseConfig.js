// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCsPmfhy63fAwKuLBHFuucT1-zy_3xtTM",
  authDomain: "myproject-cae9c.firebaseapp.com",
  projectId: "myproject-cae9c",
  storageBucket: "myproject-cae9c.firebasestorage.app",
  messagingSenderId: "234593362183",
  appId: "1:234593362183:web:a82259eec835417ec1e5a2",
  measurementId: "G-1NHJLDH8FB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
