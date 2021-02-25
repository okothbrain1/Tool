-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2021 at 07:06 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ican`
--

-- --------------------------------------------------------

--
-- Table structure for table `dataset_mobile`
--

CREATE TABLE `dataset_mobile` (
  `submission_Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `region` varchar(40) DEFAULT NULL,
  `district` varchar(40) DEFAULT NULL,
  `subcounty` varchar(60) DEFAULT NULL,
  `topic` varchar(50) DEFAULT NULL,
  `activity` varchar(100) DEFAULT NULL,
  `capture_meeting_image` varchar(100) DEFAULT NULL,
  `male_member_attendance` int(20) DEFAULT NULL,
  `female_member_attendance` int(20) DEFAULT NULL,
  `total_attendance` int(20) DEFAULT NULL,
  `meeting_latitude` varchar(100) DEFAULT NULL,
  `meeting_longitude` varchar(100) DEFAULT NULL,
  `meta_instanceID` int(11) NOT NULL,
  `submitter_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataset_mobile`
--

INSERT INTO `dataset_mobile` (`submission_Date`, `region`, `district`, `subcounty`, `topic`, `activity`, `capture_meeting_image`, `male_member_attendance`, `female_member_attendance`, `total_attendance`, `meeting_latitude`, `meeting_longitude`, `meta_instanceID`, `submitter_name`) VALUES
('2021-02-25 04:00:40', 'Kigezi', 'Gulu', 'Koch goma', 'Vsla/village meeting', 'Gulu', NULL, 10, 10, 20, '0.34078719999999996', '32.5910528', 1, 'kelsem');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataset_mobile`
--
ALTER TABLE `dataset_mobile`
  ADD PRIMARY KEY (`meta_instanceID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dataset_mobile`
--
ALTER TABLE `dataset_mobile`
  MODIFY `meta_instanceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
