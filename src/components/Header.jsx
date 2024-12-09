import React from 'react';

function Header() {
  return (
    <header>
      <nav
        aria-label="main navigation"
        className="bg-gradient-to-r from-green-800 to-green-600 pt-4 pb-3 px-4 w-full fixed top-0 left-0 z-20 shadow-lg"
      >
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <a href="#" aria-label="Home" className="flex items-center text-white">
              <span className="text-2xl font-semibold">🌱 Tree Life</span>
            </a>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </nav>
    </header>
  );
}

export default Header;