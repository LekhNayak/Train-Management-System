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
-- Table structure for table `fareperkm`
--

DROP TABLE IF EXISTS `fareperkm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fareperkm` (
  `type` varchar(50) DEFAULT NULL,
  `class` varchar(5) DEFAULT NULL,
  `fare_per_km` float DEFAULT NULL,
  KEY `type` (`type`),
  KEY `class` (`class`),
  CONSTRAINT `fareperkm_ibfk_1` FOREIGN KEY (`type`) REFERENCES `train_type` (`type`),
  CONSTRAINT `fareperkm_ibfk_2` FOREIGN KEY (`class`) REFERENCES `class_type` (`initials`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fareperkm`
--

LOCK TABLES `fareperkm` WRITE;
/*!40000 ALTER TABLE `fareperkm` DISABLE KEYS */;
INSERT INTO `fareperkm` VALUES ('Express','SL',0.7),('Express','2A',1),('Express','3A',1.3),('Express','CC',1.8),('Express','2S',0.7),('Superfast','SL',0.8),('Superfast','2A',1.5),('Superfast','3A',1.5),('Superfast','CC',1.4),('Superfast','2S',0.8),('Superfast','3E',2),('Superfast','1A',2.5),('Rajdhani','1A',2.5),('Rajdhani','2A',2),('Rajdhani','3A',1.5),('Rajdhani','SL',1),('Rajdhani','EC',0.95),('Tejas','EC',2.5),('Tejas','CC',1.5),('Vande Bharat','EC',3),('Vande Bharat','CC',1.8),('Duronto','1A',3),('Duronto','SL',0.7),('Duronto','2A',2.5),('Duronto','3A',1.5),('Duronto','CC',1.2),('Shatabdi','1A',3.5),('Shatabdi','2A',2.8),('Shatabdi','EC',2.5),('Shatabdi','EA',3),('Gatimaan','EC',3.5),('Gatimaan','CC',1.75);
/*!40000 ALTER TABLE `fareperkm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 11:38:31
