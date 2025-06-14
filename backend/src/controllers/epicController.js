// src/controllers/epicController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for the Earth Polychromatic Imaging Camera (EPIC) endpoints
 */
const epicController = {
  /**
   * Get the most recent natural color images from EPIC
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getNaturalImages: async (req, res, next) => {
    try {
      const cacheKey = `epic:natural:latest`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/natural`,
        { params: { api_key: NASA_API_KEY } }
      );
      const processedData = response.data.map((image) => {
        const { identifier, image: imageName, date } = image;
        const formattedDate = date.split(" ")[0].replace(/-/g, "/");
        const imageUrl = `${NASA_API_BASE_URL}/EPIC/archive/natural/${formattedDate}/png/${imageName}.png?api_key=${NASA_API_KEY}`;
        return {
          ...image,
          imageUrl,
        };
      });
      setCache(cacheKey, processedData, "EPIC");
      return formatResponse(res, 200, processedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get the most recent enhanced color images from EPIC
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getEnhancedImages: async (req, res, next) => {
    try {
      const cacheKey = `epic:enhanced:latest`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/enhanced`,
        { params: { api_key: NASA_API_KEY } }
      );
      const processedData = response.data.map((image) => {
        const { identifier, image: imageName, date } = image;
        const formattedDate = date.split(" ")[0].replace(/-/g, "/");
        const imageUrl = `${NASA_API_BASE_URL}/EPIC/archive/enhanced/${formattedDate}/png/${imageName}.png?api_key=${NASA_API_KEY}`;
        return {
          ...image,
          imageUrl,
        };
      });
      setCache(cacheKey, processedData, "EPIC");
      return formatResponse(res, 200, processedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get natural color images from EPIC for a specific date
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
        { params: { api_key: NASA_API_KEY } }
      );
      const processedData = response.data.map((image) => {
        const { identifier, image: imageName } = image;
        const formattedDate = date.replace(/-/g, "/");
        const imageUrl = `${NASA_API_BASE_URL}/EPIC/archive/natural/${formattedDate}/png/${imageName}.png?api_key=${NASA_API_KEY}`;
        return {
          ...image,
          imageUrl,
        };
      });
      setCache(cacheKey, processedData, "EPIC");
      return formatResponse(res, 200, processedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get enhanced color images from EPIC for a specific date
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
        { params: { api_key: NASA_API_KEY } }
      );
      const processedData = response.data.map((image) => {
        const { identifier, image: imageName } = image;
        const formattedDate = date.replace(/-/g, "/");
        const imageUrl = `${NASA_API_BASE_URL}/EPIC/archive/enhanced/${formattedDate}/png/${imageName}.png?api_key=${NASA_API_KEY}`;
        return {
          ...image,
          imageUrl,
        };
      });
      setCache(cacheKey, processedData, "EPIC");
      return formatResponse(res, 200, processedData);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a list of all available dates for EPIC images
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAvailableDates: async (req, res, next) => {
    try {
      const { type = "natural" } = req.query;

      // Validate type parameter
      if (type !== "natural" && type !== "enhanced") {
        return formatResponse(
          res,
          400,
          null,
          'Invalid type. Use either "natural" or "enhanced"'
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/EPIC/api/${type}/available`,
        { params: { api_key: NASA_API_KEY } }
      );

      return formatResponse(res, 200, {
        type,
        total: response.data.length,
        dates: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = epicController;
