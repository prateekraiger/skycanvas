// src/utils/errorHandler.js
/**
 * Centralized error handling utility for the API
 */

/**
 * Format and handle API errors
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 */
const handleError = (err, res) => {
  // Get error details
  const status = err.response?.status || err.statusCode || 500;
  const message = err.response?.data?.error?.message || 
                  err.response?.data?.error || 
                  err.response?.data?.message || 
                  err.message || 
                  'Internal Server Error';
  
  // Log error details
  console.error(`[ERROR] ${status} - ${message}`);
  if (err.stack) {
    console.error(err.stack);
  }
  
  // For NASA API specific errors, try to extract the relevant info
  let errorDetails = null;
  if (err.response?.data) {
    errorDetails = err.response.data;
  }
  
  // Send response to client
  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      details: errorDetails
    }
  });
};

/**
 * Create a custom API error with status code
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  handleError,
  ApiError
};