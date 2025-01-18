// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in by looking for sessionStorage data
  const userName = sessionStorage.getItem("userName");

  // Logout function to clear sessionStorage and redirect to HomePage
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage to log out the user
    navigate("/login"); // Redirect to the HomePage or login page
  };

  // If the user is not logged in, don't display the header
  if (!userName) {
    return null; // Return nothing if the user is not logged in
  }

  return (
    <header className="header">
      <h1>Doctor's Appointment System</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      </nav>
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
