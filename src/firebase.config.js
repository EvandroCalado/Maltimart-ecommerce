import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAKXfwx7zAwb_uRDqlNIFkUX0JhyHDjMEE",
  authDomain: "maltimart-9c69c.firebaseapp.com",
  projectId: "maltimart-9c69c",
  storageBucket: "maltimart-9c69c.appspot.com",
  messagingSenderId: "840840514830",
  appId: "1:840840514830:web:fa2e8d027367db3930db5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;