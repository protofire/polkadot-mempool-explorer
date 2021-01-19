/**
 * Module dependencies
 */
const pino = require('pino');
const { LOG_NAME, LOG_LEVEL, DEVELOPMENT } = require('../env');

let prettyPrint = false;

if (DEVELOPMENT) {
  prettyPrint = {
    colorize: true,
    translateTime: `UTC:yyyy-mm-dd'T'HH:MM:ss:l'Z'`,
  };
}

const logger = pino({
  name: LOG_NAME,
  level: LOG_LEVEL,
  prettyPrint,
});

/**
 * Expose Pino singleton instance
 */
module.exports = logger;
