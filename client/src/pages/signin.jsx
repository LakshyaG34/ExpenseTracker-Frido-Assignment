import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setUser(data);
      setEmail("");
      setPassword("");
      alert("Logged in successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleFetch}
        className="shadow-xl rounded-2xl p-8 w-full max-w-sm border border-pink-400 bg-black/40 [box-shadow:0_0_10px_rgba(240,50,100,0.8),0_0_20px_rgba(240,50,100,0.8),0_0_30px_rgba(240,50,100,0.8),0_0_40px_rgba(240,50,100,0.8)]"
      >
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
          Welcome Back!!
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-white"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-white"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Log In
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button onClick={()=>navigate("/signup")} className="text-blue-600 hover:underline">
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
