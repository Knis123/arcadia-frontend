import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";
import { jwtDecode } from "jwt-decode";

const authService = {
  // Login function with error handling
  login: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
      
      const { token } = response;

      if (!token) {
        throw new Error('Token not found in response');
      }

      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
   
      return { ...response, user: decoded };
    } catch (error) {
      
      throw new Error('Login failed, please check your credentials or try again later.');
    }
  },
  
  

  

  registerEmployee: async (userData) => {
    const response = await api.post(API_ENDPOINTS.REGISTER_EMPLOYEE,userData);
    return response;
  },

  registerVet: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER_VET, userData);
      return response.data; 
    } catch (error) {
      
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message); 
      }
      throw new Error("Registration failed. Please try again."); 
    }
  },


  // Logout function with token removal and cleanup
  logout: () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    
  },

 
};

export default authService;
