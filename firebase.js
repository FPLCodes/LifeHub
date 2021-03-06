import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATa3fTHNfI7pJpsjKgtiaGfCttmplXz9o",
  authDomain: "lifehub-f9011.firebaseapp.com",
  projectId: "lifehub-f9011",
  storageBucket: "lifehub-f9011.appspot.com",
  messagingSenderId: "146107568113",
  appId: "1:146107568113:web:2b4857ceaecce92c44be50",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
