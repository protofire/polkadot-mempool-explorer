/**
 * @class ErrorResponse
 */
class ErrorResponse {
  constructor(code, type, message) {
    this.code = code;
    this.type = type;
    this.message = message;
  }
}

/**
 * Expose ErrorResponse
 */
module.exports = ErrorResponse;
