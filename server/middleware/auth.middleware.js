import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';
import { backendConfig } from '../../config/index.js';

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new AuthenticationError('Not authenticated');
    }

    jwt.verify(token, backendConfig.jwtSecret, (err, user) => {
      if (err) {
        throw new AuthorizationError('Invalid token');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const validateRegistration = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !email.includes('@')) {
    next(new AuthenticationError('Invalid email format'));
    return;
  }
  
  if (!password || password.length < 8) {
    next(new AuthenticationError('Password must be at least 8 characters'));
    return;
  }
  
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    next(new AuthenticationError('Email and password are required'));
    return;
  }
  
  next();
}; 