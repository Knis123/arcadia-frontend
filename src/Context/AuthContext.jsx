import React, { createContext, useState, useEffect } from "react";
import authService from "../Services/authService";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { jwtDecode } from "jwt-decode";

// Create the context
export const AuthContext = createContext();

// Create the AuthContext provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        navigateToRole(decoded.role); 
      } catch (error) {
        
        localStorage.removeItem("token");
      }
    }
  }, []);

  const navigateToRole = (role) => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "veterinarian") {
      navigate("/vet/dashboard");
    } else if (role === "employee") {
      navigate("/employee/dashboard");
    }
  };

  const login = async (credentials) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser.user);
    navigateToRole(loggedInUser.user.role);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
