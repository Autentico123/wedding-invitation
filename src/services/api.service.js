/**
 * API Service for wedding invitation
 * Handles all HTTP requests to backend server
 */

// Use relative path in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class ApiService {
  /**
   * Submit RSVP to backend
   * @param {Object} rsvpData - RSVP form data
   * @returns {Promise<Object>} Response data
   */
  async submitRSVP(rsvpData) {
    try {
      const response = await fetch(`${API_BASE_URL}/rsvp/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit RSVP");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  /**
   * Get RSVP statistics
   * @returns {Promise<Object>} Statistics data
   */
  async getStatistics() {
    try {
      const response = await fetch(`${API_BASE_URL}/rsvp/statistics`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch statistics");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  /**
   * Check API health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Health Check Failed:", error);
      return { success: false, message: "Server unavailable" };
    }
  }
}

export default new ApiService();