// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const NodeCache = require("node-cache");

const nasaRoutes = require("./src/routes/nasaRoutes");
const gibsRoutes = require("./src/routes/gibsRoutes");
const { serverLimiter } = require("./src/middlewares/rateLimiter");
const { handleError } = require("./src/utils/errorHandler");

// Create Express app
const app = express();

// Initialize cache for GIBS requests (1 hour TTL)
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Make cache available to routes
app.locals.cache = cache;

// Define port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging

// Apply rate limiting to all requests
app.use(serverLimiter);

// Cache middleware specifically for GIBS imagery requests
app.use("/api/gibs/imagery", (req, res, next) => {
  const cacheKey = `${req.originalUrl}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    res.set("X-Cache", "HIT");
    return res.send(cachedData);
  }

  res.set("X-Cache", "MISS");

  // Override res.send to cache the response
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    if (res.statusCode === 200) {
      cache.set(cacheKey, body);
    }
    return originalSend(body);
  };

  next();
});

// Routes
app.use("/api/nasa", nasaRoutes);
app.use("/api/gibs", gibsRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SkyCanvas API - Your gateway to NASA data",
    version: "1.0.0",
    endpoints: {
      nasa: {
        apod: "/api/nasa/apod",
        marsRover: "/api/nasa/mars-rover",
        epic: "/api/nasa/epic",
        mediaLibrary: "/api/nasa/media",
      },
      gibs: {
        products: "/api/gibs/products",
        imagery: "/api/gibs/imagery",
        map: "/api/gibs/map",
        capabilities: "/api/gibs/capabilities",
        tile: "/api/gibs/tile",
      },
    },
  });
});

// Health check endpoint
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
      hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) || 0,
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
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
