// src/routes/nasaRoutes.js
const express = require("express");
const router = express.Router();

// Import controllers
const apodController = require("../controllers/apodController");
const mediaLibraryController = require("../controllers/mediaLibraryController");
const asteroidsController = require("../controllers/asteroidsController");
const nasaController = require("../controllers/nasaController");
const epicRoutes = require("./epicRoutes");

// Import rate limiters
const { endpointLimiter } = require("../middlewares/rateLimiter");

// APOD (Astronomy Picture of the Day) routes
router.get("/apod", endpointLimiter, apodController.getApod);
router.get("/apod/random", endpointLimiter, apodController.getRandomApod);
router.get("/apod/date/:date", endpointLimiter, apodController.getApodByDate);
router.get("/apod/range", endpointLimiter, apodController.getApodDateRange);

// EPIC routes (nested under /epic)
router.use("/epic", epicRoutes);

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

module.exports = router;
