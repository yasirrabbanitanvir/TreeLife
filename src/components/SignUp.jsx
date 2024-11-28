import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
// import plantImage from '../assets/ksenia-TBjNbj1sdAE-unsplash.jpg';
import plantImage from '../assets/ksenia-TBjNbj1sdAE-unsplash.jpg';

// Error is here. solving


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
        toast.success("User Registered Successfully!!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-800 p-6">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h3 className="text-4xl font-bold text-center text-green-600 mb-6 font-serif">
            Create an Account
          </h3>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your first name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your last name"
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already registered?{" "}
              <a href="/login" className="text-green-600 hover:underline">
                Login
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

export default SignUp;