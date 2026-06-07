import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxZYmWCkNDNhnLtGobi5P44PlBw4BCNUU",
  authDomain: "travel-explorer-41040.firebaseapp.com",
  projectId: "travel-explorer-41040",
  storageBucket: "travel-explorer-41040.firebasestorage.app",
  messagingSenderId: "704521190937",
  appId: "1:704521190937:web:7542f23c29476b6f7c3488",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;