import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYy3QiP94OP-Arb3Xv0aHygjTYIP5TLMk",
  authDomain: "leakplanting.firebaseapp.com",
  projectId: "leakplanting",
  storageBucket: "leakplanting.firebasestorage.app",
  messagingSenderId: "725588759111",
  appId: "1:725588759111:web:cb92ec657d726872c0d762",
  measurementId: "G-EY9LGN065L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporteer auth en Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
