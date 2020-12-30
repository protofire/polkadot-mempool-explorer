/**
 * Module dependencies
 */
const pino = require('pino');
const { LOG_NAME, LOG_LEVEL } = require('../env');

const logger = pino({
  name: LOG_NAME,
  level: LOG_LEVEL,
  prettyPrint: {
    colorize: true,
    translateTime: `UTC:yyyy-mm-dd'T'HH:MM:ss:l'Z'`,
  }
});

/**
 * Expose Pino singleton instance
 */
module.exports = logger;
