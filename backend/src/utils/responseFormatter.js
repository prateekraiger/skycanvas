// src/utils/responseFormatter.js
/**
 * Format API responses consistently
 * @param {Object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {Object|Array|null} data - Response data
 * @param {string} message - Custom message (optional)
 * @returns {Object} Formatted response
 */
const formatResponse = (res, status, data = null, message = null) => {
  const success = status >= 200 && status < 400;
  
  const response = {
    success,
    status,
    timestamp: new Date().toISOString()
  };
  
  if (message) {
    response.message = message;
  }
  
  if (data) {
    response.data = data;
  }
  
  return res.status(status).json(response);
};

module.exports = {
  formatResponse
};