// src/controllers/epicController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for EPIC (Earth Polychromatic Imaging Camera) endpoints
 * EPIC provides full disc imagery of Earth from the DSCOVR satellite
 */
const epicController = {
  /**
   * Get the most recent natural color images
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getNaturalImages: async (req, res, next) => {
    try {
      const cacheKey = "epic:natural:latest";
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/natural`,
        {
          params: {
            api_key: NASA_API_KEY,
          },
          timeout: 10000,
        }
      );

      // Enrich data with image URLs
      const enrichedData = response.data.map((item) => ({
        ...item,
        image_url: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.png`,
        thumbnail_url: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.jpg`,
      }));

      setCache(cacheKey, enrichedData, "EPIC");
      return formatResponse(res, 200, enrichedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get natural color images for a specific date
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getNaturalImagesByDate: async (req, res, next) => {
    try {
      const { date } = req.params;
      const cacheKey = `epic:natural:${date}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid date format. Use YYYY-MM-DD"
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/natural/date/${date}`,
        {
          params: {
            api_key: NASA_API_KEY,
          },
          timeout: 10000,
        }
      );

      // Enrich data with image URLs
      const enrichedData = response.data.map((item) => ({
        ...item,
        image_url: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.png`,
        thumbnail_url: `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.jpg`,
      }));

      setCache(cacheKey, enrichedData, "EPIC");
      return formatResponse(res, 200, enrichedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get the most recent enhanced color images
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getEnhancedImages: async (req, res, next) => {
    try {
      const cacheKey = "epic:enhanced:latest";
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/enhanced`,
        {
          params: {
            api_key: NASA_API_KEY,
          },
          timeout: 10000,
        }
      );

      // Enrich data with image URLs
      const enrichedData = response.data.map((item) => ({
        ...item,
        image_url: `https://epic.gsfc.nasa.gov/archive/enhanced/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.png`,
        thumbnail_url: `https://epic.gsfc.nasa.gov/archive/enhanced/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.jpg`,
      }));

      setCache(cacheKey, enrichedData, "EPIC");
      return formatResponse(res, 200, enrichedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get enhanced color images for a specific date
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getEnhancedImagesByDate: async (req, res, next) => {
    try {
      const { date } = req.params;
      const cacheKey = `epic:enhanced:${date}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid date format. Use YYYY-MM-DD"
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/enhanced/date/${date}`,
        {
          params: {
            api_key: NASA_API_KEY,
          },
          timeout: 10000,
        }
      );

      // Enrich data with image URLs
      const enrichedData = response.data.map((item) => ({
        ...item,
        image_url: `https://epic.gsfc.nasa.gov/archive/enhanced/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.png`,
        thumbnail_url: `https://epic.gsfc.nasa.gov/archive/enhanced/${item.date.split(" ")[0].replace(/-/g, "/")}/${item.image}.jpg`,
      }));

      setCache(cacheKey, enrichedData, "EPIC");
      return formatResponse(res, 200, enrichedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all available dates for EPIC images
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAvailableDates: async (req, res, next) => {
    try {
      const { type = "natural" } = req.query;
      const cacheKey = `epic:dates:${type}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Validate type
      if (!["natural", "enhanced", "all"].includes(type)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid type. Use 'natural', 'enhanced', or 'all'"
        );
      }

      const endpoint =
        type === "all" ? "all" : type === "enhanced" ? "enhanced" : "natural";

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/${endpoint}/available`,
        {
          params: {
            api_key: NASA_API_KEY,
          },
          timeout: 10000,
        }
      );

      setCache(cacheKey, response.data, "EPIC");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = epicController;
