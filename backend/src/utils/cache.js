// src/utils/cache.js
// Simple in-memory cache utility using node-cache
const NodeCache = require("node-cache");

// Default TTLs (in seconds)
const DEFAULT_TTL = {
  APOD: 86400, // 24 hours
  MARS_ROVER: 3600, // 1 hour
  EPIC: 3600, // 1 hour
  MEDIA: 3600, // 1 hour
};

const cache = new NodeCache();

function getCache(key) {
  return cache.get(key);
}

function setCache(key, value, type = "APOD") {
  const ttl = DEFAULT_TTL[type] || 3600;
  cache.set(key, value, ttl);
}

function delCache(key) {
  cache.del(key);
}

module.exports = {
  getCache,
  setCache,
  delCache,
  DEFAULT_TTL,
};
