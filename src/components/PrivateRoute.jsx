// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component checks if the user is logged in
const PrivateRoute = ({ element: Component, ...rest }) => {
  const userName = sessionStorage.getItem('userName'); // Check if the user is logged in

  // If user is not logged in, redirect to login page
  if (!userName) {
    return <Navigate to="/login" />;
  }

  // Render the component if user is logged in
  return <Component {...rest} />;
};

export default PrivateRoute;
