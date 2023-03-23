const { CONFLICT } = require('../utils/httpStatus');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = ConflictError;
