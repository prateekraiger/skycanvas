// src/config/apiConfig.js
/**
 * NASA API Configuration
 * Centralizes all API related configuration
 */

require("dotenv").config();

const NASA_API_KEY = process.env.NASA_API_KEY;

const NASA_API_BASE_URL = "https://api.nasa.gov";

const NASA_IMAGE_API_URL = "https://images-api.nasa.gov";

const NEO_WS_BASE_URL = "https://api.nasa.gov/neo/rest/v1";

module.exports = {
  NASA_API_KEY,
  NASA_API_BASE_URL,
  NASA_IMAGE_API_URL,
  NEO_WS_BASE_URL,
};
