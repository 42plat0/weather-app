import { 
  AuthenticationError, 
  AuthorizationError, 
  ValidationError, 
  ConflictError 
} from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Default error
  let statusCode = 500;
  let message = 'Something went wrong';
  let errors = [];

  // Handle specific error types
  if (err instanceof ValidationError) {
    statusCode = 400;
    message = 'Validation error';
    errors = err.message.split(', ');
  } else if (err instanceof AuthenticationError) {
    statusCode = 401;
    message = err.message;
  } else if (err instanceof AuthorizationError) {
    statusCode = 403;
    message = err.message;
  } else if (err instanceof ConflictError) {
    statusCode = 409;
    message = err.message;
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    errors: errors.length ? errors : undefined
  });
}; 