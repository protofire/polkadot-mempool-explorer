/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies
 */
const ErrorResponse = require('./error');

/**
 * @class InternalServerErrorResponse
 */
class InternalServerErrorResponse extends ErrorResponse {
  constructor(message = 'The server encountered an unexpected condition.') {
    super(500, 'Internal Server', message);
  }
}

/**
 * Expose InternalServerErrorResponse
 */
module.exports = InternalServerErrorResponse;
