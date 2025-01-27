import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";

const animalService = {
  // Create a new animal
  createAnimal: async (animalData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ANIMAL, animalData);
      return response.data; 
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error.response?.data?.message || "Failed to create animal";
    }
  },

  // Get all animals
  getAllAnimals: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ANIMAL);
      return response; 
    } catch (error) {
      console.error("Error fetching animals:", error);
      throw error.response?.data?.message || "Failed to fetch animals";
    }
  },

  // Get animal by ID
  getAnimalById: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.ANIMAL}/${id}`);
      console.log('API Response:', response);
      return response; 
      
    } catch (error) {
      console.error("Error fetching animal by ID:", error);
      throw error.response?.data?.message || "Failed to fetch animal";
    }
  },

  // Update an animal
  updateAnimal: async (id, animalData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.ANIMAL}/${id}`, animalData);
      return response.data; // Return the updated animal data
    } catch (error) {
      console.error("Error updating animal:", error);
      throw error.response?.data?.message || "Failed to update animal";
    }
  },

  // Delete an animal
  deleteAnimal: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.ANIMAL}/${id}`);
      return response.data; // Return the response after deletion
    } catch (error) {
      console.error("Error deleting animal:", error);
      throw error.response?.data?.message || "Failed to delete animal";
    }
  }
};

export default animalService;
