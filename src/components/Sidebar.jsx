// import React from "react";
// import Logout from "./Logout";

// const Sidebar = ({ onSectionChange }) => {
//   const handleSectionChange = (section) => {
//     onSectionChange(section);
//   };

//   return (
//     <nav
//       aria-label="Sidebar"
//       className="bg-green-800 shadow-xl min:h-screen w-full md:w-48 fixed bottom-0 md:relative z-10 flex flex-col items-center md:items-start"
//     >
//       <div className="w-full md:pt-8 mt-10">
//         <ul className="w-full space-y-2">
//           <li>
//             <button
//               onClick={() => handleSectionChange("control")}
//               className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
//             >
//               <i className="fas fa-cogs pr-2" /> Control & Monitor
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={() => handleSectionChange("profile")}
//               className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
//             >
//               <i className="fas fa-user pr-2" /> Profile
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={() => handleSectionChange("readCSV")}
//               className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
//             >
//               <i className="fas fa-file-csv pr-2" /> Read CSV
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={() => handleSectionChange("Suggest")}
//               className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
//             >
//               <i className="fas fa-leaf pr-2" /> Fertilizer Suggestion
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={() => handleSectionChange("gardenInfo")}
//               className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
//             >
//               <i className="fas fa-tree pr-2" /> Garden Info
//             </button>
//           </li>
//         </ul>
//       </div>

//       <Logout />
//     </nav>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import Logout from "./Logout";

const Sidebar = ({ onSectionChange }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const handleSectionChange = (section) => {
    onSectionChange(section);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-800 fixed top-0 left-0 w-full py-4 px-6 z-20">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            <i className="fas fa-seedling mr-2"></i> My Dashboard
          </div>
          {/* Hamburger Menu for mobile */}
          <button
            className="text-white md:hidden"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`bg-green-800 shadow-xl fixed top-0 right-0 w-full sm:w-48 md:w-48 h-full z-10 transform transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Navigation Links */}
        <ul className="w-full flex flex-col space-y-2 mt-6">
          <li>
            <button
              onClick={() => handleSectionChange("control")}
              className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
            >
              <i className="fas fa-cogs pr-2" /> Control & Monitor
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("profile")}
              className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
            >
              <i className="fas fa-user pr-2" /> Profile
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("readCSV")}
              className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
            >
              <i className="fas fa-file-csv pr-2" /> Read CSV
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("Suggest")}
              className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
            >
              <i className="fas fa-leaf pr-2" /> Fertilizer Suggestion
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSectionChange("gardenInfo")}
              className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left"
            >
              <i className="fas fa-tree pr-2" /> Garden Info
            </button>
          </li>
        </ul>

        {/* Logout Section */}
        <div className="mt-auto mb-4">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
