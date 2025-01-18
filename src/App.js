// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import UserDashboard from "./components/UserDashboard";
import Login from './components/Login'; 
import Register from './components/Register'; 
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login isLoginPage={true} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={HomePage} />} /> {/* HomePage */}
        <Route path="/doctors" element={<PrivateRoute element={DoctorsPage} />} /> {/* DoctorsPage */}
        <Route path="/dashboard" element={<PrivateRoute element={UserDashboard} />} /> {/* UserDashboard */}
        <Route path="/admin-dashboard" element={<PrivateRoute element={AdminDashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
