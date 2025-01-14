import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

function Login() {
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Ingelogd als:", user.displayName);
      })
      .catch((error) => {
        console.error("Error bij inloggen:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("Uitgelogd"))
      .catch((error) => console.error("Fout bij uitloggen:", error));
  };

  return (
    <div className="relative">
      {currentUser ? (
        <div className="relative">
          <button
            className="text-white font-bold px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {currentUser.displayName}
            <span className="ml-2">▼</span> {/* Tekentje voor dropdown */}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
              >
                Uitloggen
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="text-white font-bold px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Login;
