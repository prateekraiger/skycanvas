// src/controllers/epicController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for the EPIC (Earth Polychromatic Imaging Camera) endpoints
 */
const epicController = {
  /**
   * Get latest natural color EPIC images
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
        }
      );

      setCache(cacheKey, response.data, "EPIC");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get natural color EPIC images by date
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getNaturalImagesByDate: async (req, res, next) => {
    try {
      const { date } = req.params;
      const cacheKey = `epic:natural:date:${date}`;
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
        }
      );

      setCache(cacheKey, response.data, "EPIC");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get latest enhanced color EPIC images
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
        }
      );

      setCache(cacheKey, response.data, "EPIC");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get enhanced color EPIC images by date
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getEnhancedImagesByDate: async (req, res, next) => {
    try {
      const { date } = req.params;
      const cacheKey = `epic:enhanced:date:${date}`;
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
        }
      );

      setCache(cacheKey, response.data, "EPIC");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all available dates with EPIC images
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
      if (!["natural", "enhanced"].includes(type)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid type. Use 'natural' or 'enhanced'"
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/${type}/all`,
        {
          params: {
            api_key: NASA_API_KEY,
          },
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
