import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Corrected from Navigate to useNavigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password!");
      return;
    }

    setError(""); // Clear error if inputs are valid

    try {
      const response = await axiosInstance.post("/api/users/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-5">
          {/* Email Input */}
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm mt-4">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
