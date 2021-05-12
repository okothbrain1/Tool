-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2021 at 12:35 PM
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
-- Database: `collect`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `muser_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `phone` varchar(254) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`muser_id`, `email`, `name`, `gender`, `dob`, `phone`, `password`, `created_at`) VALUES
(1, 'skelvin@gmail.com', 'KELCIN', 'male', '2020-10-21', '785987562', '81dc9bdb52d04dc20036dbd8313ed055', '2020-10-21 09:27:25'),
(2, 'Mmtn@mtn.com', 'mtn', 'female', '2020-10-21', '784875727', 'b59c67bf196a4758191e42f76670ceba', '2020-10-21 09:29:48'),
(3, 'skelvin1@gmail.com', 'kel', 'female', '2020-10-21', '111', '698d51a19d8a121ce581499d7b701668', '2020-10-21 13:48:10'),
(4, 'k@k.com', 'kelvin', 'female', '2020-10-21', '111', '202cb962ac59075b964b07152d234b70', '2020-10-21 13:49:41'),
(5, 'kelvin@k.com', 'kelvin', 'female', '2020-10-21', '111', '698d51a19d8a121ce581499d7b701668', '2020-10-21 14:42:00'),
(6, 'kssemwezi@axiomzorn.com', 'kelsem', 'male', '2021-02-10', '987654321', '81dc9bdb52d04dc20036dbd8313ed055', '2021-02-10 12:14:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`muser_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `muser_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
