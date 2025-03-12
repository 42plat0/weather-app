import { validationResult } from 'express-validator';
import { ValidationError } from './errors.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map(err => err.msg);
      throw new ValidationError(messages.join(', '));
    }
    next();
  };
}; 