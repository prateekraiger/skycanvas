// EonetService.js - Handles all EONET API calls
const EONET_API_BASE_URL = "https://eonet.gsfc.nasa.gov/api/v3";

class EonetService {
  /**
   * Fetch natural events with optional filters
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Events data
   */
  static async getEvents(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${EONET_API_BASE_URL}/events${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch EONET events:", error);
      throw error;
    }
  }

  /**
   * Fetch events in GeoJSON format
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} GeoJSON data
   */
  static async getEventsGeoJSON(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${EONET_API_BASE_URL}/events/geojson${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch EONET GeoJSON:", error);
      throw error;
    }
  }

  /**
   * Fetch all event categories
   * @returns {Promise<Object>} Categories data
   */
  static async getCategories() {
    try {
      const response = await fetch(`${EONET_API_BASE_URL}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch EONET categories:", error);
      throw error;
    }
  }

  /**
   * Fetch specific category with events
   * @param {string} categoryId - Category ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Category data
   */
  static async getCategoryById(categoryId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${EONET_API_BASE_URL}/categories/${categoryId}${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch category ${categoryId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch available image layers
   * @returns {Promise<Object>} Layers data
   */
  static async getLayers() {
    try {
      const response = await fetch(`${EONET_API_BASE_URL}/layers`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch EONET layers:", error);
      throw error;
    }
  }

  /**
   * Fetch data sources
   * @returns {Promise<Object>} Sources data
   */
  static async getSources() {
    try {
      const response = await fetch(`${EONET_API_BASE_URL}/sources`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch EONET sources:", error);
      throw error;
    }
  }
}

export default EonetService;
