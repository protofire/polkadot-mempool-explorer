/**
 * Environment variables
 */
const variables = process.env;

const PRODUCTION = variables.NODE_ENV === 'production';

/**
 * Env - pre-parsing for all env variable
 */
module.exports = {
  ...variables,
  PRODUCTION,
  DEVELOPMENT: variables.NODE_ENV === 'development',
  TEST: variables.NODE_ENV === 'test',
  PORT: variables.PORT || 8081,
  LOG_NAME: variables.LOG_NAME || 'mempool-explorer-service',
  LOG_LEVEL: PRODUCTION ? 'info' : 'debug',
  PRETTY_PRINT: !PRODUCTION,
  API_BASE_PATH: variables.API_BASE_PATH || '/api/v1',
  CACHE_MAX_SIZE: variables.CACHE_MAX_SIZE || 10000, // Default 10000 items
  CACHE_MAX_AGE: variables.CACHE_MAX_AGE || 3600000 * 24, // Default 24 hours
  NETWORK_MAX_ITEMS: variables.NETWORK_MAX_ITEMS || 50, // Default 50
  DATE_FORMAT: variables.DATE_FORMAT || 'MMM D, YYYY, h:mm:ss A',
  WS_PROVIDER_RETRIES: variables.WS_PROVIDER_RETRIES || 5, // Default 10 times
  WS_PROVIDER_RETRY_DELAY: variables.WS_PROVIDER_RETRY_DELAY || 5000, // Default 5 seconds
  FETCH_PENDING_EXTRINSICS_DELAY:
    variables.FETCH_PENDING_EXTRINSICS_DELAY || 5000, // Default 5 seconds
};
