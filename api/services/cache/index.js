/**
 * Module dependencies
 */
const LRU = require('lru-cache');
const localLock = require('./lock');
const logger = require('../../logger');
const ExtrinsicModel = require('./extrinsic.model');
const { CACHE_MAX_AGE, CACHE_MAX_SIZE, NETWORK_MAX_ITEMS } = require('../../env');

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

    // Lock network and prevent update at the same time
    let extrinsicKeys = await lock.acquire(networkId);
    
    try {
      if (!extrinsicKeys) {
        extrinsicKeys = await CacheService.getNetworkExtrinsicKeys(networkId);  
      }

      const extrinsicKey = CacheService.getExtrinsicKey(networkId, hash, from, nonce);
      const extrinsic = new ExtrinsicModel();
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
    } catch (err) {
      logger.error({ err }, 'Error trying to upsert extrinsic');

      return null;
    } finally {
      lock.release(networkId, extrinsicKeys);
    }
  }

  static async getExtrinsics(networkId) {
    const networkKey = CacheService.getNetworkKey(networkId);
    const extrinsicKeys = JSON.parse(lruCache.get(networkKey) || null) || [];

    if (extrinsicKeys.length > 0) {
      const extrinsics = extrinsicKeys.map(
        (extrinsicKey) => JSON.parse(lruCache.get(extrinsicKey) || null),
      );

      return extrinsics.sort((a, b) => {
        if (a.createAt > b.createAt)
          return -1;
        if (a.createAt < b.createAt)
          return 1;
        return 0;
      });
    }

    return [];
  }

  static async getExtrinsic(hash, from, nonce, networkId) {
    const extrinsicKey = CacheService.getExtrinsicKey(networkId, hash, from, nonce);

    return JSON.parse(lruCache.get(extrinsicKey) || null);
  }

  static async getNetworkExtrinsicKeys(networkId) {
    const networkKey = CacheService.getNetworkKey(networkId);

    return (JSON.parse(lruCache.get(networkKey) || null) || []).reverse();
  }

  static async setExtrinsic(hash, from, nonce, networkId, data) {
    const extrinsicKey = CacheService.getExtrinsicKey(networkId, hash, from, nonce);

    lruCache.set(extrinsicKey, JSON.stringify(data));
  }

  static async setNetworkExtrinsicKeys(networkId, data) {
    const networkKey = CacheService.getNetworkKey(networkId);

    lruCache.set(networkKey, JSON.stringify(data));
  }

  static async getPendingExtrinsicHashes(networkId) {
    const extrinsics = await CacheService.getExtrinsics(networkId);
    const hashes = [];

    extrinsics.forEach((extrinsic) => {
      if (!extrinsic.finalized) {
        hashes.push(extrinsic.hash);
      }
    });

    return hashes;
  }

  static async setTokenSymbol(networkId, tokenSymbol = 'DOT') {
    const tokenSymbolKey = CacheService.getTokenSymbolKey(networkId);

    lruCache.set(tokenSymbolKey, tokenSymbol);
  }

  static async getTokenSymbol(networkId) {
    const tokenSymbolKey = CacheService.getTokenSymbolKey(networkId);

    return lruCache.get(tokenSymbolKey);
  }

  static getExtrinsicKey(networkId, hash, from, nonce) {
    if (!hash || !from || !Number.isInteger(nonce) || !networkId) {
      throw new Error('You must provide a hash, from, nonce and networkId in order to save an extrinsic');
    }

    return `extrinsic.network-${networkId}.hash-${hash}.from-${from}.nonce-${nonce}.key`;
  }

  static getNetworkKey(networkId) {
    return `network.id-${networkId}.key`;
  }

  static getTokenSymbolKey(networkId) {
    return `${CacheService.getNetworkKey(networkId)}.token-symbol`;
  }
}

/**
 * Expose CacheService
 */
module.exports = CacheService;
