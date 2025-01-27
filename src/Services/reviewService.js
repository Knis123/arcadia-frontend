import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constant";

const reviewService = {
  // Create a new review
  createReview: async (reviewData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REVIEW, reviewData);
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error.response?.data?.message || "Failed to create review";
    }
  },

  // Get all reviews
  getAllReviews: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.REVIEW);
      return response;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error.response?.data?.message || "Failed to fetch reviews";
    }
  },





  // Toggle review visibility
  toggleReviewVisibility: async (id) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.REVIEW}/${id}/toggle-visibility`);
      return response.data;
    } catch (error) {
      console.error("Error toggling review visibility:", error);
      throw error.response?.data?.message || "Failed to toggle review visibility";
    }
  },
};

export default reviewService;
