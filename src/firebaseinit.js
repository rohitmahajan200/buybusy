// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt9utNWv8aQ_36uZ_GYoMMJ5G220GCtso",
  authDomain: "ecom-website-4b8bb.firebaseapp.com",
  projectId: "ecom-website-4b8bb",
  storageBucket: "ecom-website-4b8bb.appspot.com",
  messagingSenderId: "461755717603",
  appId: "1:461755717603:web:cfde87a91036fd9281f2d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db=getFirestore(app)