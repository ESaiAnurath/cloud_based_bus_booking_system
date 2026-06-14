-- Run this in your MySQL client to set up the database

CREATE DATABASE IF NOT EXISTS bus_pass_db;
USE bus_pass_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  phone       VARCHAR(15),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transport routes table
CREATE TABLE IF NOT EXISTS bus_routes (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  route_number   VARCHAR(20) NOT NULL UNIQUE,
  source         VARCHAR(100) NOT NULL,
  destination    VARCHAR(100) NOT NULL,
  transport_mode ENUM('bus','train','flight') NOT NULL DEFAULT 'bus',
  distance_km    DECIMAL(6,2),
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schedules table (each route can have multiple departure times)
CREATE TABLE IF NOT EXISTS schedules (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  route_id         INT NOT NULL,
  departure_time   DATETIME NOT NULL,
  arrival_time     DATETIME NOT NULL,
  price            DECIMAL(8,2) NOT NULL,
  total_seats      INT NOT NULL DEFAULT 40,
  available_seats  INT NOT NULL DEFAULT 40,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES bus_routes(id) ON DELETE CASCADE
);

-- Bookings table (ticket_number is unique to prevent duplicates)
CREATE TABLE IF NOT EXISTS bookings (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NOT NULL,
  schedule_id     INT NOT NULL,
  passenger_name  VARCHAR(100),
  passenger_age   INT,
  passengers      JSON NOT NULL,
  ticket_number   VARCHAR(50) NOT NULL UNIQUE,
  category        VARCHAR(50) NOT NULL DEFAULT 'Economy',
  status          ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (schedule_id) REFERENCES schedules(id),
  UNIQUE KEY no_double_booking (user_id, schedule_id)
);

-- Sample data
INSERT INTO bus_routes (route_number, source, destination, transport_mode, distance_km) VALUES
  ('BUS-01', 'Hyderabad', 'Vijayawada', 'bus', 275.00),
  ('BUS-02', 'Hyderabad', 'Warangal', 'bus', 148.00),
  ('BUS-03', 'Hyderabad', 'Tirupati', 'bus', 560.00),
  ('TRN-01', 'Hyderabad', 'Chennai', 'train', 715.00),
  ('TRN-02', 'Hyderabad', 'Bangalore', 'train', 575.00),
  ('FLT-01', 'Hyderabad', 'Bangalore', 'flight', 510.00),
  ('FLT-02', 'Hyderabad', 'Delhi', 'flight', 1520.00);

INSERT INTO schedules (route_id, departure_time, arrival_time, price, total_seats, available_seats) VALUES
  (1, '2026-06-12 06:00:00', '2026-06-12 11:00:00', 350.00, 40, 40),
  (1, '2026-06-12 14:00:00', '2026-06-12 19:00:00', 350.00, 40, 40),
  (2, '2026-06-12 07:30:00', '2026-06-12 10:30:00', 180.00, 40, 40),
  (3, '2026-06-12 20:00:00', '2026-06-13 07:00:00', 650.00, 40, 40),
  (4, '2026-06-12 09:00:00', '2026-06-12 19:00:00', 1100.00, 120, 120),
  (5, '2026-06-12 08:30:00', '2026-06-12 16:00:00', 950.00, 120, 120),
  (6, '2026-06-12 11:00:00', '2026-06-12 12:30:00', 4200.00, 180, 180),
  (7, '2026-06-12 18:00:00', '2026-06-12 21:30:00', 5200.00, 180, 180);
