// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meetingapp-549b9.firebaseapp.com",
  projectId: "meetingapp-549b9",
  storageBucket: "meetingapp-549b9.appspot.com",
  messagingSenderId: "474789224579",
  appId: "1:474789224579:web:88468f4dc969f4e849bbb6",
  measurementId: "G-WLEGCSNF4Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
