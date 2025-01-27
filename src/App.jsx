import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Home from "./Pages/Home";
import Layout from "./Components/Client/Layout";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Habitat from "./Pages/Habitat";
import AdminDashboard from "./Pages/AdminDashboard";
import VetDashboard from "./Pages/VetDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import PrivateRoute from "./Components/PrivateRoute"; // Import the PrivateRoute component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { user } = useContext(AuthContext); // Get the user from context
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (user) {
      // Navigate to the correct dashboard based on the user role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "veterinarian") {
        navigate("/vet/dashboard");
      } else if (user.role === "employee") {
        navigate("/employee/dashboard");
      }
    }
  }, [user, navigate]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/habitat" element={<Layout><Habitat /></Layout>} />

      {/* Private Routes (Protected) */}
      <Route
        path="/admin/dashboard"
        element={<PrivateRoute element={<AdminDashboard />} role="admin" />}
      />
      <Route
        path="/vet/dashboard"
        element={<PrivateRoute element={<VetDashboard />} role="veterinarian" />}
      />
      <Route
        path="/employee/dashboard"
        element={<PrivateRoute element={<EmployeeDashboard />} role="employee" />}
      />
    </Routes>
    </QueryClientProvider>
  );
}

export default App;
