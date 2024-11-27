import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import plantImage from '../assets/ksenia-TBjNbj1sdAE-unsplash.jpg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigate("/dashboard");
      toast.success("User logged in successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-green-800 flex justify-center items-center p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h1 className="text-5xl font-bold text-center text-green-600 mb-6 font-serif">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 active:bg-green-800"
              >
                Login
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              New user?{" "}
              <a href="/signup" className="text-green-600 hover:underline">
                Register Here
              </a>
            </p>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src={plantImage}
            alt="Plant"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;