const express = require("express");
const router = express.Router();
const {
  getCapabilities,
  getTile,
  getMap,
  getVisualizationProducts,
  getImageryByDate,
} = require("../controllers/gibsController");

// Get GIBS service capabilities
router.get("/capabilities", getCapabilities);

// Get a specific tile (WMTS)
router.get("/tile", getTile);

// Get map imagery (WMS)
router.get("/map", getMap);

// Get list of available visualization products
router.get("/products", getVisualizationProducts);

// Get imagery for specific date
router.get("/imagery", getImageryByDate);

module.exports = router;
