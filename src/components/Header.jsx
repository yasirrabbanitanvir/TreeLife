// import React from 'react';

// function Header() {
//     return (
//         <header>
//             <nav
//                 aria-label="main navigation"
//                 className="bg-gradient-to-r from-green-800 to-green-600 pt-4 pb-3 px-4 w-full fixed top-0 left-0 z-20 shadow-lg"
//             >
//                 <div className="flex items-center justify-between flex-wrap">
//                     <div className="flex items-center">
//                         <a href="#" aria-label="Home" className="flex items-center text-white">
//                             <span className="text-2xl font-semibold">🌱 Tree Life</span>
//                         </a>
//                     </div>
//                     <div className="flex items-center space-x-4"></div>
//                 </div>
//             </nav>
//         </header>
//     );
// }

// export default Header;

import React from "react";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="bg-green-800 p-4 text-white flex justify-between items-center fixed top-0 left-0 w-full z-20">
      <div className="flex items-center">
        {/* Hamburger Icon for Mobile */}
        <button onClick={onToggleSidebar} className="md:hidden text-white">
          <i className="fas fa-bars"></i> {/* Hamburger Icon */}
        </button>
        <h1 className="text-xl ml-4">Dashboard</h1>
      </div>

      {/* Add any other header content like notifications, user menu, etc. */}
    </header>
  );
};

export default Header;