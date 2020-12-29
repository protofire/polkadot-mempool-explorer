/**
 * Module dependencies
 */
const LRU = require('lru-cache');
const localLock = require('./lock');
const logger = require('../../logger');
const ExtrinsicModel = require('./extrinsic.model');

const CACHE_MAX_SIZE = process.env.CACHE_MAX_SIZE || 10000; // Default 10000 items
const CACHE_MAX_AGE = process.env.CACHE_MAX_AGE || 3600000 * 24; // Default 24 hours
const NETWORK_MAX_ITEMS = process.env.NETWORK_MAX_ITEMS || 100; // Default 10

/**
 * Init cache on memory
 */
const lruCache = new LRU({
  max: CACHE_MAX_SIZE,
  maxAge: CACHE_MAX_AGE,
  updateAgeOnGet: true,
});

/**
 * Init local lock
 */
const lock = localLock();

class CacheService {
  static async upsertExtrinsic(data = {}) {
    const {
      hash, from, nonce, networkId,
    } = data;
    const extrinsicKey = CacheService.getExtrinsicKey(hash, from, nonce, networkId);

    try {
      // Lock extrinsic and prevent update at the same time
      await lock.acquire(extrinsicKey);

      const extrinsic = new ExtrinsicModel();
      const extrinsicKeys = await CacheService.getNetworkExtrinsicKeys(networkId);
      const cacheExtrinsic = await CacheService.getExtrinsic(hash, from, nonce, networkId);

      // Check if extrinsic is already on cache and update the local instance of ExtrinsicModel
      extrinsic.buildFrom(cacheExtrinsic || {});

      if (!extrinsicKeys.includes(extrinsicKey)) {
        if (extrinsicKeys.length + 1 > NETWORK_MAX_ITEMS) {
          // Remove last element from cache
          // pop() method removes the last element from an array and returns that element.
          lruCache.del(extrinsicKeys.pop());
        }

        extrinsicKeys.push(extrinsicKey);
      }

      // Update cache with data
      extrinsic.buildFrom(data);
      // Update extrinsic
      await CacheService.setExtrinsic(hash, from, nonce, networkId, extrinsic.toJSON());
      // Update network
      await CacheService.setNetworkExtrinsicKeys(networkId, extrinsicKeys);

      return extrinsic;
    } catch (error) {
      logger.error('Error trying to upsert extrinsic', error);

      return null;
    } finally {
      lock.release(extrinsicKey);
    }
  }

  static async getExtrinsics(networkId) {
    const networkKey = CacheService.getNetworkKey(networkId);
    const extrinsicKeys = JSON.parse(lruCache.get(networkKey) || null) || [];

    if (extrinsicKeys.length > 0) {
      const extrinsics = extrinsicKeys.map(
        extrinsicKey => JSON.parse(lruCache.get(extrinsicKey) || null)
      );

      return extrinsics.filter((extrinsic) => extrinsic);
    }

    return [];
  }

  static async getExtrinsic(hash, from, nonce, networkId) {
    const extrinsicKey = CacheService.getExtrinsicKey(hash, from, nonce, networkId);

    return JSON.parse(lruCache.get(extrinsicKey) || null);
  }

  static async getNetworkExtrinsicKeys(networkId) {
    const networkKey = CacheService.getNetworkKey(networkId);

    return JSON.parse(lruCache.get(networkKey) || null) || [];
  }

  static async setExtrinsic(hash, from, nonce, networkId, data) {
    const extrinsicKey = CacheService.getExtrinsicKey(hash, from, nonce, networkId);

    lruCache.set(extrinsicKey, JSON.stringify(data));
  }

  static async setNetworkExtrinsicKeys(networkId, data) {
    const networkKey = CacheService.getNetworkKey(networkId);

    lruCache.set(networkKey, JSON.stringify(data));
  }

  static async getPendingExtrinsics(networkId) {
    const extrinsics = await CacheService.getExtrinsics(networkId);

    return extrinsics.filter((extrinsic) => !extrinsic.finalized);
  }

  static getExtrinsicKey(hash, from, nonce, networkId) {
    if (!hash || !from || !Number.isInteger(nonce) || !networkId) {
      throw new Error('You must provide a hash, from, nonce and networkId in order to save an extrinsic');
    }

    return `extrinsic.network-${networkId}.hash-${hash}.from-${from}.nonce-${nonce}.key`;
  }

  static getNetworkKey(networkId) {
    return `network.id-${networkId}.key`;
  }
}

/**
 * Expose CacheService
 */
module.exports = CacheService;
