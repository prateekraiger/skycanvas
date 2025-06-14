// src/controllers/marsRoverController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for the Mars Rover Photos endpoints
 */
const marsRoverController = {
  /**
   * Get the latest photos from all operational Mars rovers
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getLatestPhotos: async (req, res, next) => {
    try {
      const { page = 1, per_page = 25 } = req.query;
      const cacheKey = `marsrover:latest:${page}:${per_page}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      // Get latest photos from all rovers (currently operating rovers: Curiosity, Perseverance)
      const rovers = ["curiosity", "perseverance"];

      const roverData = await Promise.all(
        rovers.map(async (rover) => {
          try {
            const response = await axios.get(
              `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/latest_photos`,
              {
                params: {
                  api_key: NASA_API_KEY,
                  page,
                  per_page,
                },
              }
            );

            return {
              rover,
              status: "success",
              photos: response.data.latest_photos,
            };
          } catch (error) {
            return {
              rover,
              status: "error",
              message: error.message,
            };
          }
        })
      );
      setCache(cacheKey, { rovers: roverData }, "MARS_ROVER");
      return formatResponse(res, 200, { rovers: roverData });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get photos from a specific Mars rover
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getRoverPhotos: async (req, res, next) => {
    try {
      const { rover } = req.params;
      const { sol, earth_date, camera, page = 1, per_page = 25 } = req.query;
      const cacheKey = `marsrover:photos:${rover}:${sol || ""}:${
        earth_date || ""
      }:${camera || ""}:${page}:${per_page}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);
      // Validate rover name
      const validRovers = [
        "curiosity",
        "opportunity",
        "spirit",
        "perseverance",
      ];
      if (!validRovers.includes(rover.toLowerCase())) {
        return formatResponse(
          res,
          400,
          null,
          `Invalid rover. Must be one of: ${validRovers.join(", ")}`
        );
      }

      // Validate that either sol or earth_date is provided, but not both
      if (sol && earth_date) {
        return formatResponse(
          res,
          400,
          null,
          "Provide either sol or earth_date, not both"
        );
      }

      const params = {
        api_key: NASA_API_KEY,
        page,
        per_page,
      };
      if (sol) params.sol = sol;
      if (earth_date) params.earth_date = earth_date;
      if (camera) params.camera = camera;
      const response = await axios.get(
        `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
        { params }
      );
      setCache(cacheKey, response.data, "MARS_ROVER");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get available cameras for a specific Mars rover
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getRoverCameras: async (req, res, next) => {
    try {
      const { rover } = req.params;

      // Validate rover name
      const validRovers = [
        "curiosity",
        "opportunity",
        "spirit",
        "perseverance",
      ];
      if (!validRovers.includes(rover.toLowerCase())) {
        return formatResponse(
          res,
          400,
          null,
          `Invalid rover. Must be one of: ${validRovers.join(", ")}`
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}`,
        { params: { api_key: NASA_API_KEY } }
      );

      const cameras = response.data.rover.cameras;

      return formatResponse(res, 200, { rover, cameras });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get manifest data for a specific Mars rover
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getRoverManifest: async (req, res, next) => {
    try {
      const { rover } = req.params;

      // Validate rover name
      const validRovers = [
        "curiosity",
        "opportunity",
        "spirit",
        "perseverance",
      ];
      if (!validRovers.includes(rover.toLowerCase())) {
        return formatResponse(
          res,
          400,
          null,
          `Invalid rover. Must be one of: ${validRovers.join(", ")}`
        );
      }

      const response = await axios.get(
        `${NASA_API_BASE_URL}/mars-photos/api/v1/manifests/${rover}`,
        { params: { api_key: NASA_API_KEY } }
      );

      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = marsRoverController;
