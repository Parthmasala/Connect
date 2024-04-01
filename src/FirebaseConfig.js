// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlSmqTN5z2lXomTM0W5yft1b13HUN4lpA",
  authDomain: "connect-e4944.firebaseapp.com",
  projectId: "connect-e4944",
  storageBucket: "connect-e4944.appspot.com",
  messagingSenderId: "491165592567",
  appId: "1:491165592567:web:dab081aaf50e225eda1cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth , app , db, storage}//using export so we can use this in other files