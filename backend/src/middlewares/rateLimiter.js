// src/middlewares/rateLimiter.js
const rateLimit = require("express-rate-limit");
const { ApiError } = require("../utils/errorHandler");

// Use hardcoded defaults for rate limiting
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per window

// Disable rate limiting for development
const isDev = process.env.NODE_ENV !== 'production';

const serverLimiter = isDev
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: RATE_LIMIT_WINDOW_MS,
      max: RATE_LIMIT_MAX_REQUESTS,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        error: {
          status: 429,
          message: "Too many requests, please try again later.",
        },
      },
    });

const endpointLimiter = isDev
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: RATE_LIMIT_WINDOW_MS,
      max: Math.floor(RATE_LIMIT_MAX_REQUESTS / 2), // Half of the server limit
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        error: {
          status: 429,
          message: "Too many requests for this endpoint, please try again later.",
        },
      },
    });

module.exports = {
  serverLimiter,
  endpointLimiter,
};
