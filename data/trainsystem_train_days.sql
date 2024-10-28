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
-- Table structure for table `train_days`
--

DROP TABLE IF EXISTS `train_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_days` (
  `train_no` int NOT NULL,
  `days` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  PRIMARY KEY (`train_no`,`days`),
  CONSTRAINT `train_days_ibfk_1` FOREIGN KEY (`train_no`) REFERENCES `train` (`train_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_days`
--

LOCK TABLES `train_days` WRITE;
/*!40000 ALTER TABLE `train_days` DISABLE KEYS */;
INSERT INTO `train_days` VALUES (82355,'Wednesday'),(82355,'Sunday'),(82356,'Tuesday'),(82356,'Friday'),(82501,'Monday'),(82501,'Wednesday'),(82501,'Thursday'),(82501,'Friday'),(82501,'Saturday'),(82501,'Sunday'),(82502,'Monday'),(82502,'Wednesday'),(82502,'Thursday'),(82502,'Friday'),(82502,'Saturday'),(82502,'Sunday'),(82653,'Thursday'),(82654,'Saturday'),(82901,'Monday'),(82901,'Tuesday'),(82901,'Wednesday'),(82901,'Friday'),(82901,'Saturday'),(82901,'Sunday'),(82902,'Monday'),(82902,'Tuesday'),(82902,'Wednesday'),(82902,'Friday'),(82902,'Saturday'),(82902,'Sunday');
/*!40000 ALTER TABLE `train_days` ENABLE KEYS */;
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
