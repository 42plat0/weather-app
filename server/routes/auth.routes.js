import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';

const router = Router();

// Auth routes
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', logout);

export default router; 