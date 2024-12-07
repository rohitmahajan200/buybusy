import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
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