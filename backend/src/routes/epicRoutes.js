const express = require("express");
const router = express.Router();
const {
  getNaturalImages,
  getNaturalImagesByDate,
  getEnhancedImages,
  getEnhancedImagesByDate,
  getAvailableDates,
} = require("../controllers/epicController");

// Get latest natural color images
router.get("/natural", getNaturalImages);

// Get natural color images by specific date
router.get("/natural/date/:date", getNaturalImagesByDate);

// Get latest enhanced color images
router.get("/enhanced", getEnhancedImages);

// Get enhanced color images by specific date
router.get("/enhanced/date/:date", getEnhancedImagesByDate);

// Get all available dates with EPIC images
router.get("/dates", getAvailableDates);

module.exports = router;
