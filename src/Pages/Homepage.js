import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-6">Welkom op de Homepage</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">

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
