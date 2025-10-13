import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

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
      if (!response.ok) throw new Error("Signup failed");
      const data = await response.json();
      setUser(data);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Signed up successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleFetch}
        className="relative rounded-2xl p-8 w-full max-w-sm border border-purple-800 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(240,0,240,0.3)] hover:shadow-[0_0_50px_rgba(240,0,240,0.6)] transition duration-300"
      >
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-black/40 to-purple-500 blur-md opacity-60 -z-10"></div>
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border text-purple-300 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-purple-300 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-purple-300 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border text-purple-300 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        <p className="text-sm text-center text-white mt-4">
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
