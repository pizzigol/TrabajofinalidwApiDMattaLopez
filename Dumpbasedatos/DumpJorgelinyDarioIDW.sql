CREATE DATABASE  IF NOT EXISTS `idw` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `idw`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: idw
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `alojamientos`
--

DROP TABLE IF EXISTS `alojamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamientos` (
  `idAlojamiento` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(255) NOT NULL,
  `Descripcion` text,
  `Latitud` decimal(10,8) NOT NULL,
  `Longitud` decimal(11,8) NOT NULL,
  `PrecioPorDia` decimal(10,2) NOT NULL,
  `CantidadDormitorios` int NOT NULL,
  `CantidadBanios` int NOT NULL,
  `Estado` enum('Disponible','Reservado') NOT NULL,
  `TipoAlojamiento` int DEFAULT NULL,
  `idTipoAlojamiento` int DEFAULT NULL,
  PRIMARY KEY (`idAlojamiento`),
  KEY `idTipoAlojamiento` (`idTipoAlojamiento`),
  CONSTRAINT `alojamientos_ibfk_1` FOREIGN KEY (`idTipoAlojamiento`) REFERENCES `tiposalojamiento` (`idTipoAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamientos`
--

LOCK TABLES `alojamientos` WRITE;
/*!40000 ALTER TABLE `alojamientos` DISABLE KEYS */;
INSERT INTO `alojamientos` VALUES (37,'CABAÑA 2','MAR 2',0.00000005,0.00000012,45000.00,1,1,'Disponible',23,NULL),(38,'HOTEL 1 ','SIERRAS 1',0.00000018,0.00000017,60000.00,2,1,'Disponible',25,NULL),(39,'HOTEL 2','NORTE ARGENTINO',0.00000018,0.00000018,40000.00,2,1,'Reservado',25,NULL),(40,'DEPARTAMENTO 1','MAR ',0.00000017,0.00000020,50000.00,3,1,'Disponible',24,NULL),(41,'DEPARTAMENTO 2','SIERRAS',0.00000017,0.00000019,40000.00,4,2,'Disponible',24,NULL),(42,'HOTEL 3','MAR',0.00000018,0.00000018,40000.00,1,0,'Disponible',25,NULL),(43,'HOTEL 4','SIERRAS',0.00000035,0.00000029,30000.00,2,1,'Reservado',25,NULL),(44,'CABAÑA 3','NORTE ARGENTINO',0.00000032,0.00000026,60000.00,4,2,'Disponible',23,NULL),(46,'CABAÑA 5','MAR',0.00000019,0.00000022,50000.00,2,1,'Disponible',23,NULL);
/*!40000 ALTER TABLE `alojamientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alojamientoservicios`
--

DROP TABLE IF EXISTS `alojamientoservicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamientoservicios` (
  `idAlojamientoServicio` int NOT NULL AUTO_INCREMENT,
  `idAlojamiento` int DEFAULT NULL,
  `idServicio` int DEFAULT NULL,
  PRIMARY KEY (`idAlojamientoServicio`),
  KEY `idAlojamiento` (`idAlojamiento`),
  KEY `idServicio` (`idServicio`),
  CONSTRAINT `alojamientoservicios_ibfk_1` FOREIGN KEY (`idAlojamiento`) REFERENCES `alojamientos` (`idAlojamiento`),
  CONSTRAINT `alojamientoservicios_ibfk_2` FOREIGN KEY (`idServicio`) REFERENCES `servicios` (`idServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamientoservicios`
--

LOCK TABLES `alojamientoservicios` WRITE;
/*!40000 ALTER TABLE `alojamientoservicios` DISABLE KEYS */;
INSERT INTO `alojamientoservicios` VALUES (37,37,16),(38,37,23),(40,38,19),(41,39,24),(42,40,17),(43,40,18),(45,41,19),(46,42,16),(47,42,17),(48,43,19),(49,43,17),(50,44,17),(51,44,23),(55,46,18),(56,46,18);
/*!40000 ALTER TABLE `alojamientoservicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `idAlojamiento` int DEFAULT NULL,
  `RutaArchivo` varchar(255) NOT NULL,
  PRIMARY KEY (`idImagen`),
  KEY `idAlojamiento` (`idAlojamiento`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`idAlojamiento`) REFERENCES `alojamientos` (`idAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (54,37,'Cabañas/6.jpg'),(55,38,'Hoteles/1.jpg'),(56,39,'Hoteles/14.jpg'),(57,40,'Departamentos/1.jpg'),(58,41,'Departamentos/7.jpg'),(59,42,'Hoteles/6.JPG'),(60,43,'Hoteles/10.JPG'),(61,44,'Cabañas/11.JPG'),(63,46,'Cabañas/5.jpg');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `idServicio` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (16,'WI-FI'),(17,'PILETA'),(18,'TV CABLE'),(19,'DESAYUNO'),(22,'ROPA BLANCA'),(23,'PELOTERO'),(24,'MEDIA PENSION');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposalojamiento`
--

DROP TABLE IF EXISTS `tiposalojamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposalojamiento` (
  `idTipoAlojamiento` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposalojamiento`
--

LOCK TABLES `tiposalojamiento` WRITE;
/*!40000 ALTER TABLE `tiposalojamiento` DISABLE KEYS */;
INSERT INTO `tiposalojamiento` VALUES (23,'CABAÑA'),(24,'DEPARTAMENTO'),(25,'HOTEL');
/*!40000 ALTER TABLE `tiposalojamiento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22 16:47:05
