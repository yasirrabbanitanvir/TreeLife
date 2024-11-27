import React from "react";
import { auth } from "./firebase"; 

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="block w-full py-3 px-4 text-white hover:bg-green-700 text-center md:text-left">
      <button onClick={handleLogout} aria-label="Logout" className="w-full">
        Logout
      </button>
    </div>
  );
};

export default Logout;