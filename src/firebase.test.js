// firebase.test.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  connectAuthEmulator 
} from "firebase/auth";
import { 
  getFirestore, 
  connectFirestoreEmulator 
} from "firebase/firestore";

// Dit is een fake configuratie. De emulator gebruikt deze waardes niet echt om te connecten. 
// Belangrijk is dat je projectId hetzelfde is als in je echte config, zodat emulator en je app matchen.
const firebaseTestConfig = {
  apiKey: "fake-api-key",
  authDomain: "localhost", 
  projectId: "leakplanting", // Zorg dat dit overeenkomt met je echte projectId
  storageBucket: "fake-storage-bucket",
  messagingSenderId: "fake-messaging-sender-id",
  appId: "fake-app-id"
};

const app = initializeApp(firebaseTestConfig);

export const auth = getAuth(app);
// Verbind Auth met de emulatorport (zoals in firebase.json)
connectAuthEmulator(auth, "http://localhost:9099");

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);
// Verbind Firestore met de emulatorport
connectFirestoreEmulator(db, "localhost", 8080);