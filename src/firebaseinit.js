// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6ST4FAfSU8yMD867vHqycoTZgPCnz_x8",
  authDomain: "e-com-7eb82.firebaseapp.com",
  projectId: "e-com-7eb82",
  storageBucket: "e-com-7eb82.firebasestorage.app",
  messagingSenderId: "321224115253",
  appId: "1:321224115253:web:f6c506376182f5a38f5d7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);