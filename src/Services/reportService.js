import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";

const reportService = {
  // Create a new vet report for an animal
  createVetReport: async (animalId, reportData) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.REPORT}/${animalId}`, reportData);
      return response.data; // Return the created vet report data
    } catch (error) {
      console.error("Error creating vet report:", error);
      throw error.response?.data?.message || "Failed to create vet report";
    }
  },

  // Get all vet reports
  getAllVetReports: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.REPORT);
      return response; // Return the list of all vet reports
    } catch (error) {
      console.error("Error fetching vet reports:", error);
      throw error.response?.data?.message || "Failed to fetch vet reports";
    }
  },

  // Get vet reports by animal ID
  getVetReportsByAnimal: async (animalId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.REPORT}/${animalId}`);
      return response; 
    } catch (error) {
      console.error("Error fetching vet reports by animal ID:", error);
      throw error.response?.data?.message || "Failed to fetch vet reports";
    }
  },

  // Update a vet report by ID
  updateVetReport: async (reportId, updatedData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.REPORT}/${reportId}`, updatedData);
      return response.data; // Return the updated vet report data
    } catch (error) {
      console.error("Error updating vet report:", error);
      throw error.response?.data?.message || "Failed to update vet report";
    }
  },

  // Delete a vet report by ID
  deleteVetReport: async (reportId) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.REPORT}/${reportId}`);
      return response.data; // Return the response after deletion
    } catch (error) {
      console.error("Error deleting vet report:", error);
      throw error.response?.data?.message || "Failed to delete vet report";
    }
  }
};

export default reportService;
