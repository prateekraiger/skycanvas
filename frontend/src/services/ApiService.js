// ApiService.js - Handles all API calls to our backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  /**
   * Generic method to make API calls
   */
  async fetchAPI(endpoint, options = {}) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || "API request failed");
        error.status = response.status;
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get Astronomy Picture of the Day
   * @param {string} date - Optional date in YYYY-MM-DD format
   */
  async getAPOD(date = null) {
    // Backend expects /apod or /apod/date/:date
    if (date) {
      return this.fetchAPI(`/apod/date/${date}`);
    }
    return this.fetchAPI("/apod");
  }

  /**
   * Search NASA Media Library
   * @param {string} query - Search query
   * @param {number} page - Page number
   */
  async searchMediaLibrary(query, page = 1) {
    return this.fetchAPI(
      `/media/search?q=${encodeURIComponent(query)}&page=${page}`
    );
  }

  /**
   * Get Asteroids (NeoWs feed)
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   */
  async getAsteroidsFeed(startDate, endDate) {
    let endpoint = `/asteroids/feed?start_date=${encodeURIComponent(
      startDate
    )}&end_date=${encodeURIComponent(endDate)}`;
    return this.fetchAPI(endpoint);
  }
}

// Create a singleton instance
const apiService = new ApiService();
export default apiService;
