// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdKAo1m85pT7WnOLBRoCzlTR8_L4qSCPg",
  authDomain: "neighbourhood-needs.firebaseapp.com",
  projectId: "neighbourhood-needs",
  storageBucket: "neighbourhood-needs.appspot.com",
  messagingSenderId: "373895443254",
  appId: "1:373895443254:web:5a90236facf67d83e37997",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
