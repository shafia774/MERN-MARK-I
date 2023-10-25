class ErrorCall extends Error {
    constructor(message, statusCode, issues = {}) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
      this.isOperational = true;
      if (issues && Object.keys(issues).length > 0) {
        this.issues = issues;
      }
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ErrorCall;