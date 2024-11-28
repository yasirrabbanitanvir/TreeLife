import React from "react";
import Logout from "./Logout";

const Sidebar = ({ onSectionChange }) => {
  const handleSectionChange = (section) => {
    onSectionChange(section);
  };

  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:flex bg-green-800 shadow-xl min-h-screen w-48 fixed bottom-0 md:relative z-10 flex-col items-start pt-8 mt-10"
    >
      <ul className="w-full space-y-2">
        <li>
          <button
            onClick={() => handleSectionChange("control")}
            className="block w-full py-3 px-4 text-white hover:bg-green-700"
          >
            <i className="fas fa-cogs pr-2" /> Control & Monitor
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSectionChange("profile")}
            className="block w-full py-3 px-4 text-white hover:bg-green-700"
          >
            <i className="fas fa-user pr-2" /> Profile
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSectionChange("readCSV")}
            className="block w-full py-3 px-4 text-white hover:bg-green-700"
          >
            <i className="fas fa-file-csv pr-2" /> Read CSV
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSectionChange("Suggest")}
            className="block w-full py-3 px-4 text-white hover:bg-green-700"
          >
            <i className="fas fa-leaf pr-2" /> Fertilizer Suggestion
          </button>
        </li>

        <li>
          <button
            onClick={() => handleSectionChange("gardenInfo")}
            className="block w-full py-3 px-4 text-white hover:bg-green-700"
          >
            <i className="fas fa-tree pr-2" /> Garden Info
          </button>
        </li>
      </ul>

      <Logout />
    </nav>
  );
};

export default Sidebar;