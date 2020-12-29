/**
 * Module dependencies
 */
const pino = require('pino');

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const logger = pino({
  name: 'mempool-explorer-service',
  level,
  prettyPrint: {
    colorize: true,
    translateTime: `UTC:yyyy-mm-dd'T'HH:MM:ss:l'Z'`,
  }
});

/**
 * Expose Pino singleton instance
 */
module.exports = logger;
