import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";

const foodService = {
  // Create a new food record for an animal
  createFoodRecord: async (animalId, recordData) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.RECORD}/${animalId}`, recordData);
      return response.data; 
    } catch (error) {
      
      throw error.response?.data?.message || "Failed to create food record";
    }
  },

  // Get all food records
  getAllFoodRecords: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.RECORD);
      return response; 
    } catch (error) {
      
      throw error.response?.data?.message || "Failed to fetch food records";
    }
  },

  // Get food records by animal ID
  getFoodRecordsByAnimal: async (animalId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.RECORD}/${animalId}`);
      return response; 
    } catch (error) {
     
      throw error.response?.data?.message || "Failed to fetch food records";
    }
  },


};

export default foodService;
