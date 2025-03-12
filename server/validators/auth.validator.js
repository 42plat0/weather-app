import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validate } from '../utils/validate.js';
import { ValidationError } from '../utils/errors.js';
import { backendConfig } from '../../config/index.js';

const validateEmail = body('email')
  .trim()
  .isEmail()
  .withMessage('Invalid email format')
  .normalizeEmail();

const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/\d/)
  .withMessage('Password must contain at least one number')
  .matches(/[a-zA-Z]/)
  .withMessage('Password must contain at least one letter');

const validateLoginPassword = body('password')
  .notEmpty()
  .withMessage('Password is required');

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    backendConfig.jwtSecret,
    { expiresIn: backendConfig.jwtExpiresIn }
  );
};

export const setTokenCookie = (res, token) => {
  // Set HTTP-only cookie that expires in 24 hours
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
};

export const clearTokenCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax'
  });
};

export const registerValidator = validate([
  validateEmail,
  validatePassword
]);

export const loginValidator = validate([
  validateEmail,
  validateLoginPassword
]);

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    throw new ValidationError(messages.join(', '));
  }
  next();
}; 