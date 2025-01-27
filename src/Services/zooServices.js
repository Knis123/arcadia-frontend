import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";

const zooService = {
  // Create a new service
  createService: async (serviceData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ZOO_SERVICE, serviceData);
      return response.data; // Return the created service data
    } catch (error) {
     
      throw error.response?.data?.message || "Failed to create service";
    }
  },
  // Get all services
  getAllServices: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ZOO_SERVICE);
      return response; // Return the list of all services
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error.response?.data?.message || "Failed to fetch services";
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.ZOO_SERVICE}/${id}`);
      return response; // Return the specific service data
    } catch (error) {
      console.error("Error fetching service by ID:", error);
      throw error.response?.data?.message || "Failed to fetch service";
    }
  },

  // Update a service
  updateService: async (id, serviceData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.ZOO_SERVICE}/${id}`, serviceData);
      return response.data; // Return the updated service data
    } catch (error) {
      console.error("Error updating service:", error);
      throw error.response?.data?.message || "Failed to update service";
    }
  },

  // Delete a service
  deleteService: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.ZOO_SERVICE}/${id}`);
      return response.data; // Return the response after deletion
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error.response?.data?.message || "Failed to delete service";
    }
  }
};

export default zooService;