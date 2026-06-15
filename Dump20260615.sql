-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: bus_pass_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  `passenger_name` varchar(100) NOT NULL,
  `passenger_age` int DEFAULT NULL,
  `ticket_number` varchar(50) NOT NULL,
  `status` enum('confirmed','cancelled') DEFAULT 'confirmed',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `passengers` json DEFAULT NULL,
  `category` varchar(50) DEFAULT 'Economy',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_number` (`ticket_number`),
  UNIQUE KEY `no_double_booking` (`user_id`,`schedule_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,3,'Shankar',18,'TKT-8517AC7E','confirmed','2026-06-13 17:21:25',NULL,'Economy'),(2,2,1,'RAMAKEISHNA RAO',54,'TKT-D24523F3','confirmed','2026-06-13 18:39:07','[{\"age\": \"54\", \"name\": \"RAMAKEISHNA RAO\"}]','Business'),(3,3,1,'Radhram',45,'TKT-E8B00437','confirmed','2026-06-14 08:16:22','[{\"age\": \"45\", \"name\": \"Radhram\"}]','Premium'),(4,1,4,'SHREE RAM',20,'TKT-3867495B','confirmed','2026-06-14 17:23:42','[{\"age\": \"20\", \"name\": \"SHREE RAM\"}]','Business'),(5,1,15,'jameel',64,'TKT-1632DD65','confirmed','2026-06-14 18:09:16','[{\"age\": \"64\", \"name\": \"jameel\"}]','Economy'),(6,4,4,'CH.Amurathanath',45,'TKT-C12FD8AE','confirmed','2026-06-15 10:44:49','[{\"age\": \"45\", \"name\": \"CH.Amurathanath\"}, {\"age\": \"40\", \"name\": \"ch.pushpa\"}, {\"age\": \"29\", \"name\": \"ch.vishwanath\"}, {\"age\": \"23\", \"name\": \"ch.samyuktha\"}]','Premium');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_routes`
--

DROP TABLE IF EXISTS `bus_routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route_number` varchar(20) NOT NULL,
  `source` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `distance_km` decimal(6,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `transport_mode` enum('bus','train','flight') NOT NULL DEFAULT 'bus',
  PRIMARY KEY (`id`),
  UNIQUE KEY `route_number` (`route_number`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_routes`
--

LOCK TABLES `bus_routes` WRITE;
/*!40000 ALTER TABLE `bus_routes` DISABLE KEYS */;
INSERT INTO `bus_routes` VALUES (1,'BUS-01','Hyderabad','Vijayawada',275.00,'2026-06-12 16:54:33','bus'),(2,'BUS-02','Hyderabad','Warangal',148.00,'2026-06-12 16:54:33','bus'),(3,'BUS-03','Hyderabad','Tirupati',560.00,'2026-06-12 16:54:33','flight'),(7,'TRN-CHN','Hyderabad','Chennai',710.00,'2026-06-14 18:03:41','train'),(8,'FLT-DXB','Hyderabad','Dubai',2900.00,'2026-06-14 18:03:41','flight');
/*!40000 ALTER TABLE `bus_routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route_id` int NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `total_seats` int NOT NULL DEFAULT '40',
  `available_seats` int NOT NULL DEFAULT '40',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `bus_routes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,1,'2026-06-12 06:00:00','2026-06-12 11:00:00',350.00,40,38,'2026-06-12 16:54:33'),(2,1,'2026-06-12 14:00:00','2026-06-12 19:00:00',350.00,40,40,'2026-06-12 16:54:33'),(3,2,'2026-06-12 07:30:00','2026-06-12 10:30:00',180.00,40,39,'2026-06-12 16:54:33'),(4,3,'2026-06-12 20:00:00','2026-06-13 07:00:00',650.00,40,35,'2026-06-12 16:54:33'),(13,1,'2026-06-15 06:30:00','2026-06-15 11:30:00',350.00,40,40,'2026-06-14 18:06:58'),(14,2,'2026-06-15 08:00:00','2026-06-15 11:00:00',180.00,40,40,'2026-06-14 18:06:58'),(15,3,'2026-06-15 14:30:00','2026-06-16 01:30:00',650.00,40,39,'2026-06-14 18:06:58');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_table`
--

DROP TABLE IF EXISTS `test_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_table` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_table`
--

LOCK TABLES `test_table` WRITE;
/*!40000 ALTER TABLE `test_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ESHWARAPRAGADA SAI ANURATH','anurathe5@gmail.com','$2a$12$grR4rQwPJRiNZFrBcszK/.ysH9V/W5g6pcD7a5/1Qh9BSJKXJSCkO','08885299732','2026-06-13 17:20:49'),(2,'ramakrishna','ramakrishna@123','$2a$12$hkkz1PSrabpb9AOSDQpK9eBx1Eag8r1s3EbTM4OjvH2069FtmEdCS',NULL,'2026-06-13 18:17:21'),(3,'Anurath','saianurath7779@gmail.com','$2a$12$/JefHJFFc9CvsmwWdx8da.OmNmgIYx/yIwE1Ao5r92VzcbBdcXp/6','8885299663','2026-06-14 08:15:31'),(4,'ChninnaBoyena Amurathanath','amuruth@gmail.com','$2a$12$xyCvCsfzcLT.M1PH9nk7IuQt7MkKIjETCv.rDNVB27c5.dQd0ivYG',NULL,'2026-06-15 10:43:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-15 17:17:51
