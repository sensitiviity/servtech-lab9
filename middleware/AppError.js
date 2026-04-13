class AppError extends Error {
  constructor(statusCode, code, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

AppError.validation = (details) =>
  new AppError(422, 'VALIDATION_ERROR', 'Validation failed', details);

AppError.notFound = (resource = 'Resource') =>
  new AppError(404, 'NOT_FOUND', `${resource} not found`);

AppError.badRequest = (msg) =>
  new AppError(400, 'BAD_REQUEST', msg);

AppError.conflict = (msg) =>
  new AppError(409, 'CONFLICT', msg);

AppError.unauthorized = (msg = 'Unauthorized') =>
  new AppError(401, 'UNAUTHORIZED', msg);

module.exports = AppError;