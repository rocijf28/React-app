import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Prei plant applicatie
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/rows"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
            >
              Rijen
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
