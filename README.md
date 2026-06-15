# 🚌 Cloud-Based Bus Booking System

A full-stack bus ticket booking web application developed and deployed on **AWS using AWS Learner Lab**.

---

## 🌐 Live Deployment

| Service | URL |
|--------|-----|
| **Frontend** (S3 Static Hosting) | http://bus-booking-frontend-xyz.s3-website-us-east-1.amazonaws.com/register |
| **Backend** (EC2 Instance) | http://54.145.20.191:3000 |
| **Database** | MySQL installed on AWS EC2 Console |

---

## 📸 Output Screens

<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/a03445ce-4f94-40ed-8a9d-ab5966c9db02" />

<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/492dd975-decc-4d4b-a332-40f6e7cc5360" />

---

## ☁️ AWS Infrastructure

### EC2 Instance — Backend

<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/59db5040-f5b1-4a30-904c-eba18e529563" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/2de7fa1d-8f2a-41de-800e-910cf4d47f79" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/5ef403cc-dd5a-4d87-93c4-e80b8273670a" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/fbfbcf3a-3d78-4a29-88f9-509dd23358e8" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/6c17d330-0475-44e8-b329-5b31e8fb17e9" />

### S3 Bucket — Frontend (Static Web Hosting)

<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/417610a3-b508-4bba-9f18-da4f1c3339a0" />

### Database (MySQL on AWS)

<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/b906e1b8-6fc8-442e-8a75-1dc30c6a1d51" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/d589502e-c22c-4653-9206-ce02c26b7d46" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/9031ebf7-bb7f-4e9d-93d1-b7c396dc3912" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/a2fe0088-b547-48ed-b5ab-1048c0384e91" />

### AWS Console Snapshots

<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/63c23c33-72ee-4e29-b32d-82b0a55809ae" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/ab63d12d-21d9-4a73-a7c7-89520509583d" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/7598dd27-bd7e-4dae-8bb3-0d7bb3d38464" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/d9b89736-4c7b-4de7-8291-ace04b60908c" />
<img width="667" height="500" alt="image" src="https://github.com/user-attachments/assets/a4e4e1e0-e137-4341-b8f9-10d4f2645409" />

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MySQL |
| Auth | JWT + bcryptjs |
| HTTP Client | Axios |
| Hosting | AWS S3 (frontend), AWS EC2 (backend) |

---

## 🗂️ Project Structure

```
backend/
  .env
  routes/         auth.js, bookings.js, busRoutes.js
  controllers/    (connected to DB)
  middleware/     auth.js (JWT protection)
  config/         db.js (MySQL connection), schema.sql

frontend/
  .env
  src/
    pages/        Login, Register, Booking, MyBookings, SearchBus
    components/   BusCard, Navbar
    services/     api.js (interceptors, auth headers)
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v14+
- MySQL Server (localhost:3306)

### 1. Database Setup
```bash
mysql -u root -p < backend/config/schema.sql
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
```

Configure `backend/.env`:
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

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Configure `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile *(auth required)* |

### Bus Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/routes` | Get all routes with schedules |
| GET | `/api/routes/:id` | Get specific route details |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Book a ticket *(auth required)* |
| GET | `/api/bookings/my-tickets` | Get user's bookings *(auth required)* |
| GET | `/api/bookings/ticket/:id` | Get specific ticket *(auth required)* |

---

## 🗄️ Database Schema

| Table | Purpose |
|-------|---------|
| `users` | User accounts and authentication |
| `bus_routes` | Bus route information |
| `schedules` | Departure times and seat availability |
| `bookings` | Ticket bookings with passenger details |

**Key Relationships:**
- `bookings` → `schedules` (schedule_id)
- `bookings` → `users` (user_id)
- `schedules` → `bus_routes` (route_id)

---

## 📋 Data Flow

### Registration / Login
```
Form → Validation → POST /auth/register or /auth/login
→ Hash Password → Store in DB → Generate JWT
→ Store in localStorage → Redirect to Home
```

### Search & Book
```
Search Page → GET /routes → Display BusCards → Click "Book Now"
→ Check Auth (redirect to login if needed)
→ Fill Passenger Info → POST /bookings → Generate Ticket
→ Redirect to MyBookings
```

### View Bookings
```
MyBookings → Check Auth → GET /bookings/my-tickets → Display All Bookings
```

---

## 🔐 Security Features

- **JWT Authentication** — token-based auth on all protected routes
- **Password Hashing** — bcryptjs; plain passwords never stored or transmitted
- **Axios Interceptors** — automatic auth header injection and 401 redirect
- **Prepared Statements** — SQL injection prevention
- **Transaction Support** — prevents double booking / race conditions
- **Frontend Validation** — form validation before API calls

---

## ✅ Features

- User registration and login with JWT authentication
- Browse all available bus routes and schedules
- Book tickets with passenger details
- View all personal bookings and ticket history
- Protected routes requiring authentication
- Automatic token injection in all API calls
- Loading states and error handling
- Responsive UI components
- Database persistence with MySQL

---

## 🧪 Test Flow

1. Open frontend in browser
2. Go to **Search Buses** → browse available routes
3. Click **Book Now** → redirected to login if not authenticated
4. **Register** a new account or **Login**
5. Fill in passenger details and confirm booking
6. View your tickets in **My Bookings**

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| Backend won't start | Ensure MySQL is running; check `.env` credentials |
| Frontend API calls fail | Ensure backend is on port 3000; check `VITE_API_BASE_URL` |
| Database connection error | Verify MySQL is running and DB exists |
| Port already in use | Frontend: `npm run dev -- --port 5174`; Backend: change `PORT` in `.env` |
| CORS errors | Backend has CORS enabled for development |

---

## 🚀 Next Steps (Optional Enhancements)

- Search and filter functionality for bus routes
- Payment gateway integration
- Email notifications for booking confirmations
- Seat selection UI
- Booking cancellation feature
- Admin dashboard
- Deploy to cloud (Vercel + Railway/Render)

---

## 🔒 Security Notes for Production

1. Change `JWT_SECRET` in `.env` before going live
2. Use HTTPS in production
3. Implement rate limiting on API endpoints
4. Add CSRF protection
5. Validate all input on both frontend and backend
6. Never commit `.env` files to version control
