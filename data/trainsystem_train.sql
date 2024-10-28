CREATE DATABASE  IF NOT EXISTS `trainsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trainsystem`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trainsystem
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `train`
--

DROP TABLE IF EXISTS `train`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train` (
  `train_no` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `status` enum('Running','Inactive') DEFAULT NULL,
  `depart` time DEFAULT NULL,
  `arrive` time DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  `direction` enum('UP','DOWN') DEFAULT NULL,
  PRIMARY KEY (`train_no`),
  UNIQUE KEY `train_no` (`train_no`),
  KEY `route_id` (`route_id`),
  KEY `type` (`type`),
  CONSTRAINT `train_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`),
  CONSTRAINT `train_ibfk_2` FOREIGN KEY (`type`) REFERENCES `train_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train`
--

LOCK TABLES `train` WRITE;
/*!40000 ALTER TABLE `train` DISABLE KEYS */;
INSERT INTO `train` VALUES (82355,'PNBE CSMT SF EXP','Superfast','Running','13:05:00','14:50:00',2,'DOWN'),(82356,'CSMT PNBE SF EXP','Superfast','Running','11:05:00','13:40:00',2,'UP'),(82501,'IRCTC TEJAS EXP','Tejas','Running','06:10:00','12:35:00',4,'DOWN'),(82502,'IRCTC TEJAS EXP','Tejas','Running','15:30:00','22:05:00',4,'UP'),(82653,'YPR JP EXP','Superfast','Running','11:30:00','05:25:00',3,'DOWN'),(82654,'JP YPR SF EXP','Superfast','Running','22:30:00','16:50:00',3,'UP'),(82901,'IRCTC TEJAS EXP','Tejas','Running','15:55:00','22:30:00',1,'DOWN'),(82902,'IRCTC TEJAS EXP','Tejas','Running','06:40:00','13:05:00',1,'UP');
/*!40000 ALTER TABLE `train` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 11:38:32
