import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Nieuwsblok */}
          <Link
            to="/news"
            className="bg-white shadow-md hover:shadow-xl rounded-lg p-6 transition transform hover:-translate-y-1 hover:bg-blue-50"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Nieuws en updates
            </h2>
            <p className="text-gray-600">
              Klik hier om de laatste nieuwsartikelen en updates te lezen.
            </p>
          </Link>

          {/* Loongegevens */}
          <Link
            to="/moneydetails"
            className="bg-white shadow-md hover:shadow-xl rounded-lg p-6 transition transform hover:-translate-y-1 hover:bg-green-50"
          >
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Loongegevens bekijken
            </h2>
            <p className="text-gray-600">
              Bekijk je looninformatie en download loonstroken.
            </p>
          </Link>

          {/* Landenoverzicht */}
          <Link
            to="/fields"
            className="bg-white shadow-md hover:shadow-xl rounded-lg p-6 transition transform hover:-translate-y-1 hover:bg-purple-50"
          >
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Landenoverzicht
            </h2>
            <p className="text-gray-600">
              Bekijk een gedetailleerd overzicht van alle landen.
            </p>
          </Link>
        </div>
      </main>

      
    </div>
  );
}

export default Homepage;