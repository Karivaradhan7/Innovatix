import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtshILUfAm8OQ-d6LljrLSv8dsxe69_Y0",
  authDomain: "aptora1.firebaseapp.com",
  projectId: "aptora1",
  storageBucket: "aptora1.firebasestorage.app",
  messagingSenderId: "550438290521",
  appId: "1:550438290521:web:82e93a9df3d1a25a891d48",
  measurementId: "G-EQ37G51FF7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { firebaseConfig, app, analytics, storage, db };
