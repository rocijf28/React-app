import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Components/Login';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Chat from '../Components/Chat'; // importeer Chat component

function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => console.log("Uitgelogd"));
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentUser ? (
          <div className="mb-6">
            <h2 className="text-xl font-bold">Je bent ingelogd als: {currentUser.displayName}</h2>
            <p>Email: {currentUser.email}</p>
            <button onClick={handleLogout}>Uitloggen</button>
          </div>
        ) : (
          <h2 className="text-xl font-bold mb-6">Je bent niet ingelogd</h2>
        )}
        
        <Login />

        
        <Chat />

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