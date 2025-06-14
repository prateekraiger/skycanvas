// src/controllers/neowsController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for the Near Earth Object Web Service (NeoWs) endpoints
 */
const neowsController = {
  /**
   * Get a list of asteroids based on their closest approach date to Earth
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAsteroidFeed: async (req, res, next) => {
    try {
      const { start_date, end_date } = req.query;
      const cacheKey = `neows:feed:${start_date}:${end_date || start_date}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Validate required parameters
      if (!start_date) {
        return formatResponse(res, 400, null, "start_date is required");
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(start_date)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid date format. Use YYYY-MM-DD"
        );
      }

      // If end_date is not provided, use start_date
      // NASA API allows a max of 7 days of data
      const endDate = end_date || start_date;

      // Validate end_date format
      if (!dateRegex.test(endDate)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid end_date format. Use YYYY-MM-DD"
        );
      }

      // Calculate date difference to prevent abuse
      const startDateObj = new Date(start_date);
      const endDateObj = new Date(endDate);

      if (startDateObj > endDateObj) {
        return formatResponse(
          res,
          400,
          null,
          "start_date cannot be after end_date"
        );
      }

      const diffTime = Math.abs(endDateObj - startDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // NASA API limit is 7 days
      if (diffDays > 7) {
        return formatResponse(
          res,
          400,
          null,
          "Date range cannot exceed 7 days"
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/neo/rest/v1/feed`,
        {
          params: {
            api_key: NASA_API_KEY,
            start_date,
            end_date: endDate,
          },
        }
      );
      setCache(cacheKey, response.data, "NEOWS");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get detailed information about a specific asteroid by its NASA JPL small body ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAsteroidById: async (req, res, next) => {
    try {
      const { asteroidId } = req.params;
      const cacheKey = `neows:asteroid:${asteroidId}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Validate asteroid ID parameter
      if (!asteroidId) {
        return formatResponse(res, 400, null, "Asteroid ID is required");
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/neo/rest/v1/neo/${asteroidId}`,
        { params: { api_key: NASA_API_KEY } }
      );
      setCache(cacheKey, response.data, "NEOWS");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Browse the overall asteroid dataset
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  browseAsteroids: async (req, res, next) => {
    try {
      const { page = 0, size = 20 } = req.query;
      const cacheKey = `neows:browse:${page}:${size}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Validate pagination parameters
      const pageNum = parseInt(page);
      const sizeNum = parseInt(size);

      if (isNaN(pageNum) || pageNum < 0) {
        return formatResponse(
          res,
          400,
          null,
          "page must be a non-negative integer"
        );
      }

      if (isNaN(sizeNum) || sizeNum < 1 || sizeNum > 100) {
        return formatResponse(
          res,
          400,
          null,
          "size must be an integer between 1 and 100"
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/neo/rest/v1/neo/browse`,
        {
          params: {
            api_key: NASA_API_KEY,
            page: pageNum,
            size: sizeNum,
          },
        }
      );
      setCache(cacheKey, response.data, "NEOWS");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get near earth objects statistics
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getStats: async (req, res, next) => {
    try {
      const cacheKey = `neows:stats`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      const response = await axios.get(
        `${NASA_API_BASE_URL}/neo/rest/v1/stats`,
        { params: { api_key: NASA_API_KEY } }
      );
      setCache(cacheKey, response.data, "NEOWS");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = neowsController;
