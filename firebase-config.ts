import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJVgBARynfJY8wzTl509BPXF2tzosFkPg",
  authDomain: "masiltown.firebaseapp.com",
  projectId: "masiltown",
  storageBucket: "masiltown.appspot.com",
  messagingSenderId: "453604147049",
  appId: "1:453604147049:web:646df701d99708be2ac7f8",
  measurementId: "G-SWQ0MMYELC"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);