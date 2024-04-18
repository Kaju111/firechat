import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwlaoKHY3n_6sth3hJV694BXlEZFLloSc",
  authDomain: "reactchat-527d6.firebaseapp.com",
  projectId: "reactchat-527d6",
  storageBucket: "reactchat-527d6.appspot.com",
  messagingSenderId: "538005809053",
  appId: "1:538005809053:web:e7959810b4bc9c3cd1f174",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export default app;
