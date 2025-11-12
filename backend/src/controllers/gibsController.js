const axios = require("axios");

// GIBS API endpoints
const GIBS_ENDPOINTS = {
  WMTS_EPSG4326: "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best",
  WMTS_EPSG3857: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best",
  WMS_EPSG4326: "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi",
  WMS_EPSG3857: "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi",
};

// Get available layers from GIBS
const getCapabilities = async (req, res) => {
  try {
    const { projection = "epsg4326", service = "wmts" } = req.query;

    let endpoint;
    if (service === "wmts") {
      endpoint =
        projection === "epsg3857"
          ? GIBS_ENDPOINTS.WMTS_EPSG3857
          : GIBS_ENDPOINTS.WMTS_EPSG4326;
      endpoint += "/1.0.0/WMTSCapabilities.xml";
    } else {
      endpoint =
        projection === "epsg3857"
          ? GIBS_ENDPOINTS.WMS_EPSG3857
          : GIBS_ENDPOINTS.WMS_EPSG4326;
      endpoint += "?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
    }

    const response = await axios.get(endpoint, {
      timeout: 10000,
      headers: {
        "User-Agent": "SkyCanvas/1.0",
      },
    });

    res.set("Content-Type", "application/xml");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching GIBS capabilities:", error.message);
    res.status(500).json({
      error: "Failed to fetch GIBS capabilities",
      message: error.message,
    });
  }
};

// Get tile from GIBS WMTS service
const getTile = async (req, res) => {
  try {
    const {
      layer,
      tilematrixset = "GoogleMapsCompatible_Level9",
      tilematrix,
      tilerow,
      tilecol,
      format = "image/jpeg",
      time = "",
    } = req.query;

    if (!layer || !tilematrix || !tilerow || !tilecol) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["layer", "tilematrix", "tilerow", "tilecol"],
      });
    }

    // Build WMTS tile URL
    const tileUrl = `${GIBS_ENDPOINTS.WMTS_EPSG4326}/1.0.0/${layer}/default/${time}/${tilematrixset}/${tilematrix}/${tilerow}/${tilecol}.jpg`;

    const response = await axios.get(tileUrl, {
      responseType: "arraybuffer",
      timeout: 10000,
      headers: {
        "User-Agent": "SkyCanvas/1.0",
      },
    });

    res.set("Content-Type", response.headers["content-type"] || format);
    res.set("Cache-Control", "public, max-age=86400"); // Cache for 24 hours
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching GIBS tile:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch tile",
      message: error.message,
    });
  }
};

// Get imagery via WMS
const getMap = async (req, res) => {
  try {
    const {
      layers,
      bbox,
      width = 512,
      height = 512,
      format = "image/jpeg",
      time = "",
      projection = "epsg4326",
    } = req.query;

    if (!layers || !bbox) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["layers", "bbox"],
      });
    }

    const endpoint =
      projection === "epsg3857"
        ? GIBS_ENDPOINTS.WMS_EPSG3857
        : GIBS_ENDPOINTS.WMS_EPSG4326;
    const crs = projection === "epsg3857" ? "EPSG:3857" : "EPSG:4326";

    const params = {
      SERVICE: "WMS",
      REQUEST: "GetMap",
      VERSION: "1.3.0",
      LAYERS: layers,
      CRS: crs,
      BBOX: bbox,
      WIDTH: width,
      HEIGHT: height,
      FORMAT: format,
      TRANSPARENT: "true",
    };

    if (time) {
      params.TIME = time;
    }

    const response = await axios.get(endpoint, {
      params,
      responseType: "arraybuffer",
      timeout: 15000,
      headers: {
        "User-Agent": "SkyCanvas/1.0",
      },
    });

    res.set("Content-Type", response.headers["content-type"] || format);
    res.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching WMS map:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch map",
      message: error.message,
    });
  }
};

// Get available visualization products
const getVisualizationProducts = async (req, res) => {
  try {
    // Common GIBS layers with metadata
    const popularLayers = [
      {
        id: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
        title: "VIIRS SNPP Corrected Reflectance (True Color)",
        description: "True-color imagery from VIIRS on Suomi NPP satellite",
        projection: ["EPSG:4326", "EPSG:3857"],
        temporal: true,
        format: "image/jpeg",
      },
      {
        id: "MODIS_Terra_CorrectedReflectance_TrueColor",
        title: "MODIS Terra Corrected Reflectance (True Color)",
        description: "True-color imagery from MODIS on Terra satellite",
        projection: ["EPSG:4326", "EPSG:3857"],
        temporal: true,
        format: "image/jpeg",
      },
      {
        id: "MODIS_Aqua_CorrectedReflectance_TrueColor",
        title: "MODIS Aqua Corrected Reflectance (True Color)",
        description: "True-color imagery from MODIS on Aqua satellite",
        projection: ["EPSG:4326", "EPSG:3857"],
        temporal: true,
        format: "image/jpeg",
      },
      {
        id: "BlueMarble_NextGeneration",
        title: "Blue Marble: Next Generation",
        description: "High-resolution true-color Earth imagery",
        projection: ["EPSG:4326", "EPSG:3857"],
        temporal: false,
        format: "image/jpeg",
      },
      {
        id: "VIIRS_NOAA20_CorrectedReflectance_TrueColor",
        title: "VIIRS NOAA-20 Corrected Reflectance (True Color)",
        description: "True-color imagery from VIIRS on NOAA-20 satellite",
        projection: ["EPSG:4326", "EPSG:3857"],
        temporal: true,
        format: "image/jpeg",
      },
      {
        id: "ASTER_GDEM_Greyscale_Shaded_Relief",
        title: "ASTER Global Digital Elevation Model",
        description: "Shaded relief of global elevation data",
        projection: ["EPSG:4326", "EPSG:3857"],
        temporal: false,
        format: "image/png",
      },
    ];

    res.json({
      products: popularLayers,
      count: popularLayers.length,
      source: "GIBS - Global Imagery Browse Services",
    });
  } catch (error) {
    console.error("Error fetching visualization products:", error.message);
    res.status(500).json({
      error: "Failed to fetch products",
      message: error.message,
    });
  }
};

// Get imagery for a specific date and location
const getImageryByDate = async (req, res) => {
  try {
    const {
      date,
      layer = "VIIRS_SNPP_CorrectedReflectance_TrueColor",
      bbox,
      width = 1024,
      height = 1024,
    } = req.query;

    if (!date) {
      return res.status(400).json({
        error: "Date parameter is required (format: YYYY-MM-DD)",
      });
    }

    // Default to global view if no bbox provided
    const bboxValue = bbox || "-180,-90,180,90";

    const endpoint = GIBS_ENDPOINTS.WMS_EPSG4326;

    const params = {
      SERVICE: "WMS",
      REQUEST: "GetMap",
      VERSION: "1.3.0",
      LAYERS: layer,
      CRS: "EPSG:4326",
      BBOX: bboxValue,
      WIDTH: width,
      HEIGHT: height,
      FORMAT: "image/jpeg",
      TIME: date,
      TRANSPARENT: "true",
    };

    const response = await axios.get(endpoint, {
      params,
      responseType: "arraybuffer",
      timeout: 20000,
      headers: {
        "User-Agent": "SkyCanvas/1.0",
      },
    });

    res.set("Content-Type", "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching imagery by date:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch imagery",
      message: error.message,
    });
  }
};

module.exports = {
  getCapabilities,
  getTile,
  getMap,
  getVisualizationProducts,
  getImageryByDate,
};
