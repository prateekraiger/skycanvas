// src/routes/nasaRoutes.js
const express = require("express");
const router = express.Router();

// Import controllers
const apodController = require("../controllers/apodController");
const mediaLibraryController = require("../controllers/mediaLibraryController");
const asteroidsController = require("../controllers/asteroidsController");
const epicController = require("../controllers/epicController");

// Import rate limiters
const { endpointLimiter } = require("../middlewares/rateLimiter");

// APOD (Astronomy Picture of the Day) routes
router.get("/apod", endpointLimiter, apodController.getApod);
router.get("/apod/random", endpointLimiter, apodController.getRandomApod);
router.get("/apod/date/:date", endpointLimiter, apodController.getApodByDate);
router.get("/apod/range", endpointLimiter, apodController.getApodDateRange);

// NASA Image and Video Library routes
router.get(
  "/media/search",
  endpointLimiter,
  mediaLibraryController.searchMedia,
);
router.get(
  "/media/asset/:nasaId",
  endpointLimiter,
  mediaLibraryController.getAssetMetadata,
);
router.get(
  "/media/popular",
  endpointLimiter,
  mediaLibraryController.getPopularMedia,
);
router.get(
  "/media/collections",
  endpointLimiter,
  mediaLibraryController.getCollections,
);

// Asteroids (NeoWs) routes
router.get(
  "/asteroids/feed",
  endpointLimiter,
  asteroidsController.getAsteroidsFeed,
);

// EPIC (Earth Polychromatic Imaging Camera) routes
router.get(
  "/epic/natural",
  endpointLimiter,
  epicController.getNaturalImages
);
router.get(
  "/epic/natural/date/:date",
  endpointLimiter,
  epicController.getNaturalImagesByDate
);
router.get(
  "/epic/enhanced",
  endpointLimiter,
  epicController.getEnhancedImages
);
router.get(
  "/epic/enhanced/date/:date",
  endpointLimiter,
  epicController.getEnhancedImagesByDate
);
router.get(
  "/epic/dates",
  endpointLimiter,
  epicController.getAvailableDates
);

module.exports = router;
