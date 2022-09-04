import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWTT5FNIb-1tcd1X4J_MkeFx0o11o0-oA",
  authDomain: "organizer-26c6e.firebaseapp.com",
  projectId: "organizer-26c6e",
  storageBucket: "organizer-26c6e.appspot.com",
  messagingSenderId: "92090159707",
  appId: "1:92090159707:web:e0d3fbea4bf5580519657e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt: 'select_account'
});

export const db = getFirestore(app)