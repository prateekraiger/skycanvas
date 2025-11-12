// src/routes/eonetRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const NodeCache = require("node-cache");

// Import rate limiters
const { endpointLimiter } = require("../middlewares/rateLimiter");

// Cache for 10 minutes (EONET updates frequently)
const cache = new NodeCache({ stdTTL: 600 });

const EONET_BASE_URL = "https://eonet.gsfc.nasa.gov/api/v3";

/**
 * GET /events
 * Fetch natural events with optional filters
 * Query params: status, limit, days, start, end, category, source, bbox
 */
router.get("/events", endpointLimiter, async (req, res) => {
  try {
    const queryParams = req.query;
    const cacheKey = `events-${JSON.stringify(queryParams)}`;

    // Check cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("✅ Returning cached EONET events");
      return res.json(cachedData);
    }

    // Fetch from EONET API
    const response = await axios.get(`${EONET_BASE_URL}/events`, {
      params: queryParams,
      timeout: 10000,
    });

    // Cache the response
    cache.set(cacheKey, response.data);
    console.log(`✅ Fetched ${response.data.events.length} events from EONET`);

    res.json(response.data);
  } catch (error) {
    console.error("❌ EONET API Error:", error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        message: "Failed to fetch natural events",
        details: error.message,
      },
    });
  }
});

/**
 * GET /events/geojson
 * Fetch events in GeoJSON format for mapping
 */
router.get("/events/geojson", endpointLimiter, async (req, res) => {
  try {
    const queryParams = req.query;
    const cacheKey = `geojson-${JSON.stringify(queryParams)}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("✅ Returning cached GeoJSON data");
      return res.json(cachedData);
    }

    const response = await axios.get(`${EONET_BASE_URL}/events/geojson`, {
      params: queryParams,
      timeout: 10000,
    });

    cache.set(cacheKey, response.data);
    console.log(
      `✅ Fetched GeoJSON with ${response.data.features.length} features`,
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ EONET GeoJSON Error:", error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        message: "Failed to fetch GeoJSON data",
        details: error.message,
      },
    });
  }
});

/**
 * GET /categories
 * Fetch all event categories
 */
router.get("/categories", endpointLimiter, async (req, res) => {
  try {
    const cacheKey = "categories";

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${EONET_BASE_URL}/categories`, {
      timeout: 10000,
    });

    cache.set(cacheKey, response.data);
    console.log(`✅ Fetched ${response.data.categories.length} categories`);

    res.json(response.data);
  } catch (error) {
    console.error("❌ EONET Categories Error:", error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        message: "Failed to fetch categories",
        details: error.message,
      },
    });
  }
});

/**
 * GET /categories/:id
 * Fetch specific category details with events
 */
router.get("/categories/:id", endpointLimiter, async (req, res) => {
  try {
    const { id } = req.params;
    const queryParams = req.query;
    const cacheKey = `category-${id}-${JSON.stringify(queryParams)}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${EONET_BASE_URL}/categories/${id}`, {
      params: queryParams,
      timeout: 10000,
    });

    cache.set(cacheKey, response.data);
    console.log(`✅ Fetched category: ${id}`);

    res.json(response.data);
  } catch (error) {
    console.error(`❌ EONET Category ${req.params.id} Error:`, error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        message: `Failed to fetch category: ${req.params.id}`,
        details: error.message,
      },
    });
  }
});

/**
 * GET /layers
 * Fetch available image layers
 */
router.get("/layers", endpointLimiter, async (req, res) => {
  try {
    const cacheKey = "layers";

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${EONET_BASE_URL}/layers`, {
      timeout: 10000,
    });

    cache.set(cacheKey, response.data);
    console.log(`✅ Fetched ${response.data.categories.length} layer categories`);

    res.json(response.data);
  } catch (error) {
    console.error("❌ EONET Layers Error:", error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        message: "Failed to fetch layers",
        details: error.message,
      },
    });
  }
});

/**
 * GET /sources
 * Fetch data source information
 */
router.get("/sources", endpointLimiter, async (req, res) => {
  try {
    const cacheKey = "sources";

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${EONET_BASE_URL}/sources`, {
      timeout: 10000,
    });

    cache.set(cacheKey, response.data);
    console.log(`✅ Fetched ${response.data.sources.length} data sources`);

    res.json(response.data);
  } catch (error) {
    console.error("❌ EONET Sources Error:", error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      error: {
        message: "Failed to fetch sources",
        details: error.message,
      },
    });
  }
});

module.exports = router;
