import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Removed the duplicate Link import
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError(""); // Reset error before API call

    // call api sign up
    try {
      const response = await axiosInstance.post("/api/users/register", {
        name: name,
        email: email,
        password: password,
      });

      // handle successfully register response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/signin");
      }
    } catch (error) {
      if (response.data && response.data && response.data.message) {
        setError(error.response.accessToken);
      } else {
        setError("An unexspected error occurred. Please try again!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Name input */}
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)} // Fixed this to update password
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

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          {/* Sign In Link */}
          <div className="text-center text-sm mt-4">
            <span>Already have an account? </span>
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
