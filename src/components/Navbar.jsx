import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logout from "./Logout";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-600 text-white fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <a href="/" className="text-2xl font-bold text-white">
          Tree Life
        </a>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleNavbar}
          aria-label="Toggle Navigation"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl`} />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <a href="/" className="text-2xl font-bold text-green-500">
            Tree Life
          </a>
          <button
            className="text-white text-2xl"
            onClick={toggleNavbar}
            aria-label="Close Menu"
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6">
          <li>
            <NavLink
              to="/"
              className="block w-full py-3 px-4 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-cogs pr-2" /> Control & Monitor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="block w-full py-3 px-4 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-user pr-2" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/CsvReader"
              className="block w-full py-3 px-4 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-file-csv pr-2" /> Read CSV
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/suggest"
              className="block w-full py-3 px-4 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-leaf pr-2" /> Fertilizer Suggestion
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gardenInfo"
              className="block w-full py-3 px-4 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-tree pr-2" /> Garden Info
            </NavLink>
          </li>
        </ul>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full text-center">
          <Logout />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;