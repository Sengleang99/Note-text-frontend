import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(false); // Token is present, allow access to the route
    } else {
      setLoading(false); // No token, proceed with redirect
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking token
  }

  if (!token) {
    return <Navigate to="/signin" replace />; // Redirect to login if no token
  }

  return children;
};

export default PrivateRoute;
