// src/context/Firebase.js

import firebase from 'firebase/app';
import 'firebase/firestore'; // if you need Firestore
import 'firebase/auth'; // if you need Firebase authentication
import 'firebase/storage'; // if you need Firebase storage

// Your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, firestore, auth, storage };