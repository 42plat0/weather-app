import { Router } from 'express';
import { logWeatherSearch, getRecentSearches } from '../controllers/weather.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { weatherLogValidator } from '../validators/weather.validator.js';

const router = Router();

// All weather routes require authentication
router.use(authenticateToken);

// Log a weather search
router.post('/log', weatherLogValidator, logWeatherSearch);

// Get recent searches
router.get('/recent', getRecentSearches);

export default router; 