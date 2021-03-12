/**
 * Module dependencies
 */
const InternalServerErrorResponse = require('./internal-server-error');
const NotFoundErrorResponse = require('./not-found-error');
const ErrorResponse = require('./error');

/**
 * Expose HTTP Errors
 */
module.exports = {
  InternalServerErrorResponse,
  NotFoundErrorResponse,
  ErrorResponse,
};
