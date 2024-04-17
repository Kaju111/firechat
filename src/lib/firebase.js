import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwf2C265yRHGdWXYhmQByoyraUjxZFgKI",
  authDomain: "reactchat-9aa7b.firebaseapp.com",
  projectId: "reactchat-9aa7b",
  storageBucket: "reactchat-9aa7b.appspot.com",
  messagingSenderId: "1075313975322",
  appId: "1:1075313975322:web:d6f2152111de221c86b1a3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
