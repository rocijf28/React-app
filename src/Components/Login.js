import React from 'react';
import { auth, googleProvider } from '../firebase'; // pas pad aan naar jouw firebase.js
import { signInWithPopup } from "firebase/auth";

function Login() {
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // Hier krijg je user info
                const user = result.user;
                console.log("Ingelogd als:", user.displayName);
            })
            .catch((error) => {
                console.error("Error bij inloggen:", error);
            });
    };

    return (
        <div>
            <h1>Login pagina</h1>
            <button onClick={signInWithGoogle}>Log in met Google</button>
        </div>
    );
}

export default Login;