// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const nasaRoutes = require("./src/routes/nasaRoutes");

// Import middlewares
const { serverLimiter } = require("./src/middlewares/rateLimiter");
const { handleError } = require("./src/utils/errorHandler");

// Create Express app
const app = express();

// Define port
const PORT = 5000; // Hardcoded default

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging

// Apply rate limiting to all requests
app.use(serverLimiter);

// Routes
app.use("/api/nasa", nasaRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SkyCanvas API - Your gateway to NASA data",
    version: "1.0.0",
    endpoints: {
      apod: "/api/nasa/apod",
      marsRover: "/api/nasa/mars-rover",
      epic: "/api/nasa/epic",
      mediaLibrary: "/api/nasa/media",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource does not exist",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: development`);
});

module.exports = app; // For testing purposes
