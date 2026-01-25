// App.js

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
import Login from "./components/Login";
import GoogleSuccess from "./components/GoogleSuccess";
import Dashboard from "./components/Dashboard"; // ✅ REQUIRED import
import NewUser from "./components/NewUser"; // ✅ import NewUser component

// Read stored role
const getRole = () => localStorage.getItem("role");

// Protected Route – only checks login
const ProtectedRoute = ({ children }) => {
  const role = getRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Google OAuth redirect */}
        <Route path="/google/success" element={<GoogleSuccess />} />

        {/* ✅ SINGLE dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ New User Form */}
        <Route
          path="/new-user"
          element={
            <ProtectedRoute>
              <NewUser />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
