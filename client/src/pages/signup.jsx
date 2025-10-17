import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      setUser(data);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Signed up successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleFetch}
        className="w-full max-w-sm p-8 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create an Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <button onClick={()=>navigate("/login")} className="text-blue-600 hover:underline">
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
