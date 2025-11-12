// frontend/src/services/gibsService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/nasa", "");

export const gibsService = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/gibs/products`);
    return response.json();
  },

  async getMapUrl(layers, bbox, time, options = {}) {
    const params = new URLSearchParams({
      layers,
      bbox,
      time,
      width: options.width || 1024,
      height: options.height || 1024,
      format: options.format || "image/jpeg",
      projection: options.projection || "epsg4326",
    });

    return `${API_BASE_URL}/gibs/map?${params}`;
  },
};
