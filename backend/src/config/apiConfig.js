// src/config/apiConfig.js
/**
 * NASA API Configuration
 * Centralizes all API related configuration
 */

// NASA API Key (Fallback to DEMO_KEY if not provided)
const NASA_API_KEY = "DEMO_KEY"; // Hardcoded

// NASA API Base URL
const NASA_API_BASE_URL = "https://api.nasa.gov"; // Hardcoded

// URL for NASA's Image and Video Library (no API key required)
const NASA_IMAGE_API_URL = "https://images-api.nasa.gov";

module.exports = {
  NASA_API_KEY,
  NASA_API_BASE_URL,
  NASA_IMAGE_API_URL,
};
