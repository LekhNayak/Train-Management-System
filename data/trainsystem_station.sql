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
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station` (
  `id` varchar(5) NOT NULL,
  `division_id` varchar(5) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `station_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES ('ADI','ADI','Ahmedabad Jn'),('AII','AII','Ajmer Jn'),('ASK','MYS','Arsikere Jn'),('BAY','UBL','Bellary Jn'),('BH','BRC','Bharuch Jn'),('BHL','AII','Bhilwara'),('BRC','BRC','Vadodara Jn (RL)'),('BSL','CSTM','Bhusaval Jn'),('BSR','BCT','Vasai Road'),('BVI','BCT','Borivali'),('CNB','PRYJ','Kanpur Central'),('COR','RTM','Chittaurgarh'),('CSMT','CSTM','C Shivaji Maharaj T'),('CTA','MYS','Chitradurg'),('DDU','DDU','Dd Upadhyaya Jn'),('ET','BPL','Itarsi Jn'),('GTL','GTL','Guntakal Jn (Rev)'),('GZB','DLI','Ghaziabad'),('JBP','JBP','Jabalpur'),('JP','JP','Jaipur'),('JR','MYS','Chikjajur Jn'),('KLBG','SUR','Kalaburagi'),('KSG','JP','Kishangarh'),('KYN','CSTM','Kalyan Jn'),('LJN','LJN','Lucknow Ne'),('MALM','GTL','Manthralayam Road'),('MDS','RTM','Mandsor'),('MMCT','BCT','Mumbai Central'),('ND','BRC','Nadiad Jn'),('NDLS','DLI','New Delhi'),('NMH','RTM','Nimach'),('PCOI','PRYJ','Prayagrajcheoki'),('PNBE','DNR','Patna Jn'),('PUNE','PUNE','Pune Jn (RL)'),('RC','GTL','Raichur'),('RPR','DNR','Raghunathpur'),('RRB','MYS','Birur Jn'),('RTM','RTM','Ratlam Jn'),('ST','BCT','Surat'),('STA','JBP','Satna'),('SUR','SUR','Solapur Jn'),('TDL','PRYJ','Tundla Jn'),('TK','SBC','Tumkur'),('VAPI','BCT','Vapi'),('YG','GTL','Yadgir'),('YPR','SBC','Yasvantpur Jn');
/*!40000 ALTER TABLE `station` ENABLE KEYS */;
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
