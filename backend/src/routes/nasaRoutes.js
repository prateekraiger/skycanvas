// src/routes/nasaRoutes.js
const express = require("express");
const router = express.Router();

// Import controllers
const apodController = require("../controllers/apodController");
const marsRoverController = require("../controllers/marsRoverController");
const epicController = require("../controllers/epicController");
const mediaLibraryController = require("../controllers/mediaLibraryController");

// Import rate limiters
const { endpointLimiter } = require("../middlewares/rateLimiter");

// APOD (Astronomy Picture of the Day) routes
router.get("/apod", endpointLimiter, apodController.getApod);
router.get("/apod/random", endpointLimiter, apodController.getRandomApod);
router.get("/apod/date/:date", endpointLimiter, apodController.getApodByDate);
router.get("/apod/range", endpointLimiter, apodController.getApodDateRange);

// Mars Rover photos routes
router.get("/mars-rover", endpointLimiter, marsRoverController.getLatestPhotos);
router.get(
  "/mars-rover/:rover",
  endpointLimiter,
  marsRoverController.getRoverPhotos
);
router.get(
  "/mars-rover/:rover/cameras",
  endpointLimiter,
  marsRoverController.getRoverCameras
);
router.get(
  "/mars-rover/:rover/manifests",
  endpointLimiter,
  marsRoverController.getRoverManifest
);

// EPIC (Earth Polychromatic Imaging Camera) routes
router.get("/epic/natural", endpointLimiter, epicController.getNaturalImages);
router.get("/epic/enhanced", endpointLimiter, epicController.getEnhancedImages);
router.get(
  "/epic/natural/date/:date",
  endpointLimiter,
  epicController.getNaturalImagesByDate
);
router.get(
  "/epic/enhanced/date/:date",
  endpointLimiter,
  epicController.getEnhancedImagesByDate
);
router.get(
  "/epic/available-dates",
  endpointLimiter,
  epicController.getAvailableDates
);

// NASA Image and Video Library routes
router.get(
  "/media/search",
  endpointLimiter,
  mediaLibraryController.searchMedia
);
router.get(
  "/media/asset/:nasaId",
  endpointLimiter,
  mediaLibraryController.getAssetMetadata
);
router.get(
  "/media/popular",
  endpointLimiter,
  mediaLibraryController.getPopularMedia
);
router.get(
  "/media/collections",
  endpointLimiter,
  mediaLibraryController.getCollections
);

module.exports = router;
