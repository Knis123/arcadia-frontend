import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";

const habitatService = {
  
  createHabitat: async (habitatData) => {
    try {
      const response = await api.post(API_ENDPOINTS.HABITAT, habitatData);
      return response.data; 
    } catch (error) {
      console.error("Error creating habitat:", error);
      throw error.response?.data?.message || "Failed to create habitat";
    }
  },

  
  getAllHabitats: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HABITAT);
      return response; 
    } catch (error) {
      console.error("Error fetching Habitats:", error);
      throw error.response?.data?.message || "Failed to fetch habitats";
    }
  },

  
  getHabitatById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.HABITAT}/${id}`);
      console.log('API Response:', response);
      return response; 
    } catch (error) {
      console.error("Error fetching habitat by ID:", error);
      throw error.response?.data?.message || "Failed to fetch habitat";
    }
  },
  
  updateHabitat: async (id, habitatData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.HABITAT}/${id}`, habitatData);
      return response; // Return the updated animal data
    } catch (error) {
      console.error("Error updating habitat:", error);
      throw error.response?.data?.message || "Failed to update habitat";
    }
  },


  deleteHabitat: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.HABITAT}/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error deleting habitat:", error);
      throw error.response?.data?.message || "Failed to delete habitat";
    }
  }
};

export default habitatService;
