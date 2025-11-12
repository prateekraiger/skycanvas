const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const NodeCache = require("node-cache");

// Import routes
const nasaRoutes = require("./src/routes/nasaRoutes");
const eonetRoutes = require("./src/routes/eonetRoutes");

// Import middlewares
const { serverLimiter } = require("./src/middlewares/rateLimiter");
const { handleError } = require("./src/utils/errorHandler");

// Create Express app
const app = express();

// Initialize cache
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
app.locals.cache = cache;

// Define port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Apply rate limiting
app.use(serverLimiter);

// Routes
app.use("/api/nasa", nasaRoutes);
app.use("/api/eonet", eonetRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SkyCanvas API - Your gateway to NASA data",
    version: "1.0.0",
    endpoints: {
      nasa: {
        apod: "/api/nasa/apod",
        apodByDate: "/api/nasa/apod/date/:date",
        epicNatural: "/api/nasa/epic/natural",
        epicByDate: "/api/nasa/epic/natural/date/:date",
        epicEnhanced: "/api/nasa/epic/enhanced",
        epicDates: "/api/nasa/epic/dates",
      },
      eonet: {
        events: "/api/eonet/events",
        eventsGeoJSON: "/api/eonet/events/geojson",
        categories: "/api/eonet/categories",
        categoryById: "/api/eonet/categories/:id",
        layers: "/api/eonet/layers",
        sources: "/api/eonet/sources",
      },
      gibs: {
        products: "/api/gibs/products",
        imagery: "/api/gibs/imagery",
        map: "/api/gibs/map",
      },
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  const cacheStats = cache.getStats();
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    cache: {
      keys: cache.keys().length,
      hits: cacheStats.hits,
      misses: cacheStats.misses,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource does not exist",
    requestedPath: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📡 NASA API endpoints: http://localhost:${PORT}/api/nasa`);
  console.log(`🌊 EONET API endpoints: http://localhost:${PORT}/api/eonet`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
