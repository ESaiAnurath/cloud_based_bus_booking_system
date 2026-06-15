# Bus Pass System - Complete Setup Guide

## Overview
Your bus pass booking system is now fully connected with the frontend, backend, and database. All pages and components are integrated with proper API calls and authentication.

## Prerequisites
1. **Node.js** - v14 or higher
2. **MySQL Server** - Running on localhost:3306
3. **Git** (optional) - For version control

## Database Setup

### Step 1: Create Database
Run the SQL schema to set up your database:

```bash
# Open MySQL client
mysql -u root -p

# Then execute the schema (paste the SQL from backend/config/schema.sql)
```

Or run directly:
```bash
mysql -u root -p < backend/config/schema.sql
```

## Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
The `.env` file is already created. Update it with your MySQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=bus_pass_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Step 4: Start Backend Server
```bash
npm run dev
```

Backend will run on: `http://localhost:3000`

## Frontend Setup

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
The `.env` file is already set up:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Step 4: Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173` (or another port shown in terminal)

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/profile` - Get user profile (requires auth)

### Bus Routes
- **GET** `/api/routes` - Get all available routes with schedules
- **GET** `/api/routes/:id` - Get specific route details

### Bookings
- **POST** `/api/bookings` - Book a ticket (requires auth)
- **GET** `/api/bookings/my-tickets` - Get user's bookings (requires auth)
- **GET** `/api/bookings/ticket/:id` - Get specific ticket details (requires auth)

## Features Implemented

### Frontend Pages
1. **Home** - Landing page with quick access to search and login
2. **Search Buses** - Browse all available bus routes and schedules
3. **Login** - User authentication
4. **Register** - New user registration
5. **Booking** - Book tickets for selected bus
6. **My Bookings** - View all user's confirmed bookings

### Backend Features
1. **User Authentication** - JWT-based auth with secure password hashing (bcryptjs)
2. **Bus Routes Management** - Database of all bus routes and schedules
3. **Ticket Booking** - Booking with seat availability checks and race condition prevention
4. **Booking Confirmation** - Unique ticket number generation
5. **User Bookings** - Query user's booking history

### Database Schema
- **users** - User accounts and authentication
- **bus_routes** - Bus route information
- **schedules** - Departure times and seat availability per route
- **bookings** - Ticket bookings with passenger details

## Testing Flow

1. Start backend: `npm run dev` (in backend folder)
2. Start frontend: `npm run dev` (in frontend folder)
3. Open browser to frontend URL (usually `http://localhost:5173`)

### Test Scenario:
1. Click "Search Buses" - View available buses
2. Click "Book Now" on any bus
3. Redirected to login/register if not authenticated
4. Register a new account or login
5. Fill passenger details and book
6. View your bookings in "My Bookings"

## Key Integrations

### Authentication Flow
- User logs in → JWT token stored in localStorage
- Token automatically sent with all protected API requests
- Token automatically added to Authorization header
- Expired/invalid tokens redirect to login page

### API Communication
- Axios client configured with automatic token injection
- Error handling for 401 (unauthorized) responses
- Environment-based API URL configuration

### Database Connectivity
- MySQL connection pooling for better performance
- Prepared statements for SQL injection prevention
- Transaction support for booking operations (prevents double booking)

## Troubleshooting

### Backend won't start
- Ensure MySQL is running: `mysql -u root -p`
- Check .env database credentials
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Frontend API calls fail
- Ensure backend is running on port 3000
- Check VITE_API_BASE_URL in frontend/.env
- Open browser console for detailed error messages

### Database connection error
- Verify MySQL is running
- Check .env credentials match your MySQL setup
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port already in use
- Frontend: `npm run dev -- --port 5174`
- Backend: Change PORT in .env file

## Next Steps (Optional Enhancements)

1. Add search/filter functionality for buses
2. Implement payment gateway integration
3. Add email notifications for bookings
4. Implement seat selection UI
5. Add booking cancellation feature
6. Implement admin dashboard
7. Add deployment to cloud (Vercel for frontend, Heroku for backend)

## Security Notes

1. Change JWT_SECRET in .env before production
2. Use environment variables for sensitive data
3. Implement rate limiting on API endpoints
4. Add CSRF protection
5. Use HTTPS in production
6. Validate all input on both frontend and backend

## File Structure Updated

```
backend/
  .env (configured)
  routes/auth.js, bookings.js, busRoutes.js
  controllers/ (all connected to DB)
  middleware/auth.js (JWT protection)
  config/db.js (MySQL connection)

frontend/
  .env (configured)
  src/
    pages/ (all connected to backend APIs)
    components/ (BusCard, Navbar updated)
    services/api.js (interceptors, auth headers)
```

## Support

For any issues, check:
1. Browser console for frontend errors
2. Terminal output for backend logs
3. MySQL for database errors
4. .env file for configuration issues
