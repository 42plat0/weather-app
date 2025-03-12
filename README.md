# Weather Logging Application

A full-stack application that allows users to log weather data for different cities. Built with React for the frontend and Express.js for the backend.

## Project Structure

```
.
├── client/             # React frontend
│   ├── public/         # Static files
│   └── src/
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       ├── assets/     # Images, fonts, etc.
│       └── utils/      # Utility functions
│
└── server/             # Express backend
    ├── config/         # Configuration files
    ├── controllers/    # Request handlers
    ├── models/         # Database models
    ├── routes/         # API routes
    ├── middleware/     # Custom middleware
    ├── utils/          # Utility functions
    ├── validators/     # Input validators
    ├── db/            # Database setup
    ├── app.js         # Express app setup
    └── server.js      # Server entry point
```

## Features

- User authentication (register/login)
- JWT-based session management with secure cookies
- Weather data logging for cities
- Input validation and error handling
- PostgreSQL database integration

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Fill in your environment variables

4. Start the application:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend development server
   cd ../client
   npm run dev
   ```

## Environment Variables

Required environment variables for the server:
- `PORT` - Server port
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `FRONTEND_URL` - Frontend application URL
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password 