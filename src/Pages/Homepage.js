import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Components/Login';
import { auth } from '../firebase'; // pad naar firebase.js klopt
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user is null als niet ingelogd, anders user object
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Uitgelogd");
      })
      .catch((error) => {
        console.error("Error bij uitloggen:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentUser ? (
          <div className="mb-6">
            <h2 className="text-xl font-bold">Je bent ingelogd als: {currentUser.displayName}</h2>
            <p>Email: {currentUser.email}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              onClick={handleLogout}
            >
              Uitloggen
            </button>
          </div>
        ) : (
          <h2 className="text-xl font-bold mb-6">Je bent niet ingelogd</h2>
        )}
        
        <Login />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-6">
          <Link to="/news" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-100 transition duration-300">
            <h2 className="text-xl font-bold mb-4">Een blok met nieuws</h2>
            <p className="text-gray-700">Klik hier om naar het nieuws te gaan.</p>
          </Link>

          <Link to="/moneydetails" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-100 transition duration-300">
            <h2 className="text-xl font-bold mb-4">Loongegevens inzien</h2>
            <p className="text-gray-700">Klik hier om je loongegevens te bekijken.</p>
          </Link>

          <Link to="/fields" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-100 transition duration-300">
            <h2 className="text-xl font-bold mb-4">Landenoverzicht</h2>
            <p className="text-gray-700">Klik hier om het landenoverzicht te zien.</p>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Homepage;