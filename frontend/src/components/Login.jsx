import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with credentials:", user);
      const response = await axios.post("http://localhost:5000/login", user);
      console.log("Server response:", response);

      // Save JWT Token to Local Storage
      localStorage.setItem("token", response.data.token);

      // Notify parent component about successful login
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      // Redirect to Home Page after Login
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Please enter your details to log in.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 peer"
            />
            <label
              htmlFor="email"
              className="absolute top-3 left-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 peer"
            />
            <label
              htmlFor="password"
              className="absolute top-3 left-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-600"
            >
              Password
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-red-500 text-sm mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-600 hover:underline font-medium"
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;