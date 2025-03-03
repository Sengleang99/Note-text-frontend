import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./page/Auth/SignIn";
import SignUp from "./page/Auth/SignUp";
import Home from "./page/Home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
