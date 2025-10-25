import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeBRq1z-diZGRuxSonsI4Jn-9UQ8v8IU0",
  authDomain: "aptora-4108d.firebaseapp.com",
  projectId: "aptora-4108d",
  storageBucket: "aptora-4108d.firebasestorage.app",
  messagingSenderId: "966897977550",
  appId: "1:966897977550:web:8f8910927011ab9225689f",
  measurementId: "G-SWFKT9VK3P"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { firebaseConfig, app, analytics, storage, db };
