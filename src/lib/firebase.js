import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrHJE_B1MVX_Lvr_tYNjgC4XDvTEnJzvI",
  authDomain: "e-kachara.firebaseapp.com",
  projectId: "e-kachara",
  storageBucket: "e-kachara.firebasestorage.app",
  messagingSenderId: "222702462406",
  appId: "1:222702462406:web:c8cc2f7cc5e1f3436abec7",
  measurementId: "G-S3TP47RWWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };