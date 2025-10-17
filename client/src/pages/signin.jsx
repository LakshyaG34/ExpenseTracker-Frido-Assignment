import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setUser(data);
      setEmail("");
      setPassword("");
      // alert("Logged in successfully!");
      toast.success("Signed In Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
