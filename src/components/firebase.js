import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoSixqqjPoYhPO0Z4cW6CG_ah1YZ9R04g",
  authDomain: "tree-life-react-firebase.firebaseapp.com",
  projectId: "tree-life-react-firebase",
  storageBucket: "tree-life-react-firebase.appspot.com",
  messagingSenderId: "281542876109",
  appId: "1:281542876109:web:716c6d1a2992a6314cc284",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;