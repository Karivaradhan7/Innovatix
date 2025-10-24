import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxzIIs-VQ8Q3Z5rp1Mcx4Qk-HRveUlUdU",
  authDomain: "aptora-58a5d.firebaseapp.com",
  projectId: "aptora-58a5d",
  storageBucket: "aptora-58a5d.firebasestorage.app",
  messagingSenderId: "906991340467",
  appId: "1:906991340467:web:39bb82415d5e5b99ced9c6",
  measurementId: "G-BVP8FE0D4J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { firebaseConfig, app, analytics, storage };
