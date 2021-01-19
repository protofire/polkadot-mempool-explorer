/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies
 */
const ErrorResponse = require('./error');

/**
 * @class NotFoundErrorResponse
 */
class NotFoundErrorResponse extends ErrorResponse {
  constructor(message = 'Resource not found') {
    super(404, 'Not Found', message);
  }
}

/**
 * Expose NotFoundErrorResponse
 */
module.exports = NotFoundErrorResponse;
