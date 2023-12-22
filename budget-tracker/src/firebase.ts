import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB6EJ5vCZobIXDM6BUCIq3lxCvP0RoxV6k",
    authDomain: "crypto-pwa-151b7.firebaseapp.com",
    projectId: "crypto-pwa-151b7",
    storageBucket: "crypto-pwa-151b7.appspot.com",
    messagingSenderId: "412192815150",
    appId: "1:412192815150:web:3cf3ebb61f5554f1b047bf",
    measurementId: "G-E21Z4T6SP4"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);