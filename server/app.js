import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import weatherRoutes from './routes/weather.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { backendConfig } from '../config/index.js';

const app = express();

// Middleware
app.use(cors({
  origin: backendConfig.frontendUrl,
  credentials: true // Enable credentials for cookies
}));
app.use(express.json());
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api', authRoutes);
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use(errorHandler);

export default app; 