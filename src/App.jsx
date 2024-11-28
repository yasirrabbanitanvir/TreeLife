import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard";
import Suggest from "./components/Suggest";
import PieChartPage from "./components/PieChartPage";
import Profile from "./components/Profile";
import CsvReader from "./components/CsvReader";
import GardenInfo from "./components/GardenInfo";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="md:hidden">
          <Navbar />
        </div>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/suggest" element={<Suggest />} />
              <Route path="/PieChartPage" element={<PieChartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/CsvReader" element={<CsvReader />} />
              <Route path="/gardenInfo" element={<GardenInfo />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;