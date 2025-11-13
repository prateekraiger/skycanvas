// src/controllers/mediaLibraryController.js
const axios = require("axios");
const { formatResponse } = require("../utils/responseFormatter");
const { NASA_API_BASE_URL, NASA_API_KEY } = require("../config/apiConfig");
const { getCache, setCache } = require("../utils/cache");

/**
 * Controller for NASA Image and Video Library endpoints
 */
const mediaLibraryController = {
  /**
   * Search for media in NASA's image and video library
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  searchMedia: async (req, res, next) => {
    try {
      const cacheKey = `media:search:${JSON.stringify(req.query)}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      const {
        q,
        center,
        description,
        keywords,
        location,
        media_type,
        nasa_id,
        photographer,
        secondary_creator,
        title,
        year_start,
        year_end,
        page = 1,
        page_size = 25,
      } = req.query;

      // If no search query, return popular media instead
      if (
        !q &&
        !center &&
        !description &&
        !keywords &&
        !location &&
        !media_type &&
        !nasa_id &&
        !photographer &&
        !secondary_creator &&
        !title &&
        !year_start &&
        !year_end
      ) {
        // By default, return popular media if no query is specified
        return mediaLibraryController.getPopularMedia(req, res, next);
      }

      const params = {
        q,
        center,
        description,
        keywords,
        location,
        media_type,
        nasa_id,
        photographer,
        secondary_creator,
        title,
        year_start,
        year_end,
        page,
      };

      // Remove undefined values
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );

      const response = await axios.get("https://images-api.nasa.gov/search", {
        params,
      });

      // Format and enrich the response
      const collection = response.data.collection;
      const items = collection.items.map((item) => {
        // Extract thumbnails, original assets, and metadata
        const thumbnailUrl =
          item.links && item.links.find((link) => link.rel === "preview")?.href;
        const assetUrl =
          item.links &&
          item.links.find((link) => link.rel === "captions")?.href;

        return {
          ...item,
          thumbnail: thumbnailUrl,
          asset: assetUrl,
        };
      });

      const formattedResponse = {
        ...collection,
        items,
      };

      setCache(cacheKey, formattedResponse, "MEDIA");
      return formatResponse(res, 200, formattedResponse);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get asset metadata for a specific NASA media item
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAssetMetadata: async (req, res, next) => {
    try {
      const { nasaId } = req.params;
      const cacheKey = `media:asset:${nasaId}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      if (!nasaId) {
        return formatResponse(res, 400, null, "NASA ID is required");
      }

      const response = await axios.get(
        `https://images-api.nasa.gov/asset/${nasaId}`
      );
      setCache(cacheKey, response.data, "MEDIA");
      return formatResponse(res, 200, response.data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get popular media items (most recent)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getPopularMedia: async (req, res, next) => {
    try {
      const { limit = 25 } = req.query;
      const cacheKey = `media:popular:${limit}`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // Get recent media with high-quality imagery
      const response = await axios.get("https://images-api.nasa.gov/search", {
        params: {
          media_type: "image",
          year_start: new Date().getFullYear() - 1,
          page_size: limit,
          page: 1,
        },
      });

      // Format and enrich the response
      const collection = response.data.collection;
      const items = collection.items.map((item) => {
        // Extract thumbnails, original assets, and metadata
        const thumbnailUrl =
          item.links && item.links.find((link) => link.rel === "preview")?.href;

        return {
          id: item.data[0].nasa_id,
          title: item.data[0].title,
          description: item.data[0].description,
          date_created: item.data[0].date_created,
          media_type: item.data[0].media_type,
          center: item.data[0].center,
          thumbnail: thumbnailUrl,
        };
      });

      setCache(
        cacheKey,
        { total: collection.metadata.total_hits, items },
        "MEDIA"
      );
      return formatResponse(res, 200, {
        total: collection.metadata.total_hits,
        items,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get NASA media collections
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getCollections: async (req, res, next) => {
    try {
      const cacheKey = `media:collections`;
      const cached = getCache(cacheKey);
      if (cached) return formatResponse(res, 200, cached);

      // NASA API doesn't have a direct endpoint for collections, so we'll create curated collections
      const collections = [
        {
          id: "apollo",
          title: "Apollo Program",
          description:
            "The Apollo program was the NASA spaceflight project that landed the first humans on the Moon.",
          query: "apollo program moon landing",
        },
        {
          id: "mars-rovers",
          title: "Mars Rovers",
          description:
            "Images and data from various Mars rover missions including Curiosity, Perseverance, and more.",
          query: "mars rover",
        },
        {
          id: "hubble",
          title: "Hubble Space Telescope",
          description:
            "Stunning images from the Hubble Space Telescope, revolutionizing our view of the cosmos.",
          query: "hubble telescope",
        },
        {
          id: "iss",
          title: "International Space Station",
          description:
            "Images from and of the International Space Station, the largest human-made object in space.",
          query: "international space station",
        },
        {
          id: "earth",
          title: "Earth from Space",
          description: "Our beautiful planet as seen from orbit and beyond.",
          query: "earth from space",
        },
        {
          id: "galaxies",
          title: "Galaxies",
          description:
            "Images of distant galaxies and galaxy clusters throughout the universe.",
          query: "galaxy galaxies",
        },
      ];

      setCache(cacheKey, collections, "MEDIA");
      return formatResponse(res, 200, collections);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mediaLibraryController;
