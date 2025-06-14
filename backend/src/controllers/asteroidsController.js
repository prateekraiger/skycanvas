const axios = require("axios");
const { NEO_WS_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { formatResponse } = require("../utils/responseFormatter");

const asteroidsController = {
  /**
   * Get asteroids feed from NeoWs
   * @route GET /asteroids/feed?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
   */
  getAsteroidsFeed: async (req, res, next) => {
    try {
      const { start_date, end_date } = req.query;
      if (!start_date || !end_date) {
        return formatResponse(
          res,
          400,
          null,
          "start_date and end_date are required"
        );
      }
      const response = await axios.get(`${NEO_WS_BASE_URL}/feed`, {
        params: {
          start_date,
          end_date,
          api_key: NASA_API_KEY,
        },
      });
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = asteroidsController;
