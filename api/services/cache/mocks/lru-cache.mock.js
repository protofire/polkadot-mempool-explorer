/**
 * Cache object
 */
let cache = {};

/**
 * Reset current cache
 */
const resetCache = () => {
  cache = {};
};

/**
 * Expose mock wrapper
 */
module.exports = {
  resetCache,
  lru: {
    get: (key) => {
      const item = cache[key];

      if (!item) {
        return undefined;
      }

      return item.value;
    },
    set: (key, value) => {
      cache[key] = { value };
    },
    del: (key) => {
      delete cache[key];
    },
  },
};
