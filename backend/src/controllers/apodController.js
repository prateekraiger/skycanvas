// src/controllers/apodController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for the Astronomy Picture of the Day (APOD) endpoints
 */
const apodController = {
  /**
   * Get the Astronomy Picture of the Day
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getApod: async (req, res, next) => {
    try {
      const { date, hd, thumbs } = req.query;
      const cacheKey = `apod:${date || "today"}:${hd}:${thumbs}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          date,
          hd: hd === "true",
          thumbs: thumbs === "true",
        },
      });
      setCache(cacheKey, response.data, "APOD");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a random Astronomy Picture of the Day
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getRandomApod: async (req, res, next) => {
    try {
      const { count = 1 } = req.query;
      const cacheKey = `apod:random:${count}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      // Ensure count is between 1 and 100
      const safeCount = Math.min(Math.max(parseInt(count) || 1, 1), 100);
      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          count: safeCount,
        },
      });
      setCache(cacheKey, response.data, "APOD");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get the Astronomy Picture of the Day for a specific date
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getApodByDate: async (req, res, next) => {
    try {
      const { date } = req.params;
      const cacheKey = `apod:date:${date}`;
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
      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          date,
        },
      });
      setCache(cacheKey, response.data, "APOD");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get Astronomy Pictures of the Day for a date range
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getApodDateRange: async (req, res, next) => {
    try {
      const { start_date, end_date, thumbs } = req.query;
      const cacheKey = `apod:range:${start_date}:${end_date}:${thumbs}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      // Validate date parameters
      if (!start_date || !end_date) {
        return formatResponse(
          res,
          400,
          null,
          "Both start_date and end_date are required"
        );
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
        return formatResponse(
          res,
          400,
          null,
          "Invalid date format. Use YYYY-MM-DD"
        );
      }

      // Check if date range is valid
      const startDateObj = new Date(start_date);
      const endDateObj = new Date(end_date);
      if (startDateObj > endDateObj) {
        return formatResponse(
          res,
          400,
          null,
          "start_date cannot be after end_date"
        );
      }

      // Calculate date difference
      const diffTime = Math.abs(endDateObj - startDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Limit date range to prevent abuse
      if (diffDays > 100) {
        return formatResponse(
          res,
          400,
          null,
          "Date range cannot exceed 100 days"
        );
      }

      const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
        params: {
          api_key: NASA_API_KEY,
          start_date,
          end_date,
          thumbs: thumbs === "true",
        },
      });
      setCache(cacheKey, response.data, "APOD");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = apodController;
