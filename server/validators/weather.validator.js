import { body } from 'express-validator';
import { validate } from '../utils/validate.js';

const validateCityName = body('cityName')
  .trim()
  .notEmpty()
  .withMessage('City name is required')
  .isLength({ min: 2, max: 100 })
  .withMessage('City name must be between 2 and 100 characters')
  .matches(/^[a-zA-Z\s-]+$/)
  .withMessage('City name can only contain letters, spaces, and hyphens')
  .customSanitizer(value => {
    // Format city name (trim, capitalize first letter of each word)
    return value.replace(/\s+/g, ' ').trim()
      .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  });

export const weatherLogValidator = validate([validateCityName]); 