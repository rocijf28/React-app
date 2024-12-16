import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo of Titel */}
        <div className="text-white text-2xl font-bold">
          Prei Plant Applicatie
        </div>

        {/* Hamburger Menu voor Mobiel */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigatie Links */}
        <ul
          className={`lg:flex lg:space-x-6 lg:items-center lg:static absolute top-full left-0 w-full lg:w-auto bg-blue-500 lg:bg-transparent transition-transform transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } lg:translate-y-0`}
        >
          <li>
            <Link
              to="/"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/rows"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded transition"
            >
              Rijen
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className="block text-white hover:bg-blue-700 px-3 py-2 rounded transition"
            >
              Chat
            </Link>
          </li>
        </ul>

        {/* Login Component */}
        <div className="hidden lg:block">
          <Login />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;