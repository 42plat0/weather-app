# Weather Logging Application

A full-stack application that allows users to log weather data for different cities. Built with React for the frontend and Express.js for the backend.

## Project Structure

This is a monorepo containing both the client and server code:

```
.
├── client/             # React frontend
│   ├── public/         # Static files
│   └── src/
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       ├── assets/     # Images, fonts, etc.
│       ├── hooks/      # Custom React hooks
│       ├── styles/     # SCSS styles
│       └── utils/      # Utility functions
│
├── server/             # Express backend
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── validators/     # Input validators
│   ├── db/             # Database setup
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
│
├── package.json        # Shared dependencies and scripts
├── .env.example        # Example environment variables
├── .env                # Environment variables
└── .eslintrc.json      # ESLint configuration
```

## Features

- User authentication (register/login)
- JWT-based session management with secure cookies
- Weather data logging for cities using Meteo.lt API
- Most viewed cities tracking (localStorage)
- Input validation and error handling
- PostgreSQL database integration

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - The project uses a `.env` file in the root directory
   - Make sure all required variables are set (see Environment Variables section)

4. Start the application:
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

## API Integration

The application integrates with the [Meteo.lt API](https://api.meteo.lt/) to fetch Lithuanian cities and weather data. The API provides:

- List of available cities
- Detailed weather forecasts
- Current weather conditions

## Environment Variables

The following environment variables are used in the `.env` file:

### Frontend Variables (must be prefixed with VITE_)
- `VITE_API_URL` - Backend API URL for the client (e.g., http://localhost:5000/api)
- `VITE_APP_TITLE` - Application title

### Backend Variables
- `PORT` - Server port
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `FRONTEND_URL` - Frontend application URL

### Database Variables
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password 