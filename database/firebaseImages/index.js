// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyChRamN-CSWd59UFWHP9sabSIOkykS6hi4",

  authDomain: "store-images-5e452.firebaseapp.com",

  projectId: "store-images-5e452",

  storageBucket: "store-images-5e452.appspot.com",

  messagingSenderId: "857686822860",

  appId: "1:857686822860:web:720ee90062dd248f33d769",

  measurementId: "G-W616HT128N"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);