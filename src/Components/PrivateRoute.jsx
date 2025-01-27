// src/Components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ element, role, ...rest }) => {
  const { user } = useContext(AuthContext); // Get user from context

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirect to home if user doesn't have the right role
  }

  return React.cloneElement(element, { ...rest }); // Render the component if authenticated and authorized
};

export default PrivateRoute;
