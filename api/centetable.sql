-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2021 at 01:46 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `centedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `centetable`
--

CREATE TABLE `centetable` (
  `id` int(13) NOT NULL,
  `consent` varchar(7) DEFAULT NULL,
  `farmers_name` varchar(12) DEFAULT NULL,
  `any_disability` varchar(14) DEFAULT NULL,
  `disability_type` varchar(15) DEFAULT NULL,
  `own_a_mobile_phone` varchar(18) DEFAULT NULL,
  `What_type_of_phone_do_you_own` varchar(29) DEFAULT NULL,
  `No_of_contacts` varchar(14) DEFAULT NULL,
  `tel_no1` varchar(7) DEFAULT NULL,
  `tel_No_2` varchar(8) DEFAULT NULL,
  `service_provider` varchar(16) DEFAULT NULL,
  `Specify_svc_provider` varchar(20) DEFAULT NULL,
  `mm_reg_status` varchar(13) DEFAULT NULL,
  `registered_mm_number` varchar(20) DEFAULT NULL,
  `nin` varchar(3) DEFAULT NULL,
  `ID_photo_url` varchar(12) DEFAULT NULL,
  `Photo_url` varchar(9) DEFAULT NULL,
  `occupation` varchar(10) DEFAULT NULL,
  `specify_other_occupation` varchar(24) DEFAULT NULL,
  `Martial_status` varchar(14) DEFAULT NULL,
  `What_is_your_gender` varchar(19) DEFAULT NULL,
  `name_of_husband` varchar(15) DEFAULT NULL,
  `number_of_wives_husbands` varchar(24) DEFAULT NULL,
  `name_first_wife` varchar(15) DEFAULT NULL,
  `name_second_wife` varchar(16) DEFAULT NULL,
  `status_in_a_family` varchar(18) DEFAULT NULL,
  `next_of_kin` varchar(11) DEFAULT NULL,
  `next_of_kin_has_contact` varchar(23) DEFAULT NULL,
  `next_of_kin_phone_no` varchar(20) DEFAULT NULL,
  `region` varchar(6) DEFAULT NULL,
  `district` varchar(8) DEFAULT NULL,
  `other_district` varchar(14) DEFAULT NULL,
  `subcounty` varchar(9) DEFAULT NULL,
  `other_subcounty` varchar(15) DEFAULT NULL,
  `subcounty_other_district` varchar(24) DEFAULT NULL,
  `soiltype` varchar(8) DEFAULT NULL,
  `parish` varchar(6) DEFAULT NULL,
  `village` varchar(7) DEFAULT NULL,
  `nearest_town` varchar(12) DEFAULT NULL,
  `Local_council1_name` varchar(19) DEFAULT NULL,
  `resident_since` varchar(14) DEFAULT NULL,
  `Description_of_location` varchar(24) DEFAULT NULL,
  `DOB` varchar(3) DEFAULT NULL,
  `level_of_education` varchar(18) DEFAULT NULL,
  `head_of_the_household` varchar(21) DEFAULT NULL,
  `Location` varchar(8) DEFAULT NULL,
  `Mobile_literacy` varchar(15) DEFAULT NULL,
  `any_dependants` varchar(14) DEFAULT NULL,
  `dependant_no` varchar(12) DEFAULT NULL,
  `dependants_age_bracket` varchar(22) DEFAULT NULL,
  `farmer_org` varchar(10) DEFAULT NULL,
  `name_of_farmer_org` varchar(18) DEFAULT NULL,
  `position_in_FO` varchar(14) DEFAULT NULL,
  `Your_position_in_the_fo` varchar(23) DEFAULT NULL,
  `male_members_in_FO` varchar(18) DEFAULT NULL,
  `female_members_in_FO` varchar(20) DEFAULT NULL,
  `Affiliation` varchar(11) DEFAULT NULL,
  `Name_of_connected_ACE_or_DFA` varchar(28) DEFAULT NULL,
  `main_income_source` varchar(18) DEFAULT NULL,
  `mainincome_since` varchar(16) DEFAULT NULL,
  `sector` varchar(6) DEFAULT NULL,
  `main_income_relaibility` varchar(23) DEFAULT NULL,
  `main_income_amount` varchar(18) DEFAULT NULL,
  `annual_income` varchar(13) DEFAULT NULL,
  `other_income_sources` varchar(20) DEFAULT NULL,
  `other_income_activity` varchar(21) DEFAULT NULL,
  `years_of_experince` varchar(18) DEFAULT NULL,
  `other_income_reliability` varchar(25) DEFAULT NULL,
  `amount` varchar(6) DEFAULT NULL,
  `income_trend` varchar(12) DEFAULT NULL,
  `access_to_Health_services` varchar(25) DEFAULT NULL,
  `health_expense` varchar(14) DEFAULT NULL,
  `school_going_children` varchar(21) DEFAULT NULL,
  `no_of_school_going_children` varchar(27) DEFAULT NULL,
  `school_fees_expense` varchar(19) DEFAULT NULL,
  `expenditure` varchar(11) DEFAULT NULL,
  `disposable_income` varchar(17) DEFAULT NULL,
  `what_is_the_land_tenor` varchar(22) DEFAULT NULL,
  `Specify_other` varchar(13) DEFAULT NULL,
  `value_of_land` varchar(13) DEFAULT NULL,
  `own_any_farm_machinery` varchar(22) DEFAULT NULL,
  `house_ownership` varchar(15) DEFAULT NULL,
  `house_structure` varchar(15) DEFAULT NULL,
  `Farm_size` varchar(9) DEFAULT NULL,
  `total_land_size` varchar(15) DEFAULT NULL,
  `Main_crop_enterprise_` varchar(21) DEFAULT NULL,
  `landsize_main_crop_enterprise` varchar(29) DEFAULT NULL,
  `additional_land_main_enterprise` varchar(32) DEFAULT NULL,
  `yield_expected_main_enterprise` varchar(30) DEFAULT NULL,
  `farm_at_residence` varchar(17) DEFAULT NULL,
  `GPS_main_enterprise` varchar(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `centetable`
--

INSERT INTO `centetable` (`id`, `consent`, `farmers_name`, `any_disability`, `disability_type`, `own_a_mobile_phone`, `What_type_of_phone_do_you_own`, `No_of_contacts`, `tel_no1`, `tel_No_2`, `service_provider`, `Specify_svc_provider`, `mm_reg_status`, `registered_mm_number`, `nin`, `ID_photo_url`, `Photo_url`, `occupation`, `specify_other_occupation`, `Martial_status`, `What_is_your_gender`, `name_of_husband`, `number_of_wives_husbands`, `name_first_wife`, `name_second_wife`, `status_in_a_family`, `next_of_kin`, `next_of_kin_has_contact`, `next_of_kin_phone_no`, `region`, `district`, `other_district`, `subcounty`, `other_subcounty`, `subcounty_other_district`, `soiltype`, `parish`, `village`, `nearest_town`, `Local_council1_name`, `resident_since`, `Description_of_location`, `DOB`, `level_of_education`, `head_of_the_household`, `Location`, `Mobile_literacy`, `any_dependants`, `dependant_no`, `dependants_age_bracket`, `farmer_org`, `name_of_farmer_org`, `position_in_FO`, `Your_position_in_the_fo`, `male_members_in_FO`, `female_members_in_FO`, `Affiliation`, `Name_of_connected_ACE_or_DFA`, `main_income_source`, `mainincome_since`, `sector`, `main_income_relaibility`, `main_income_amount`, `annual_income`, `other_income_sources`, `other_income_activity`, `years_of_experince`, `other_income_reliability`, `amount`, `income_trend`, `access_to_Health_services`, `health_expense`, `school_going_children`, `no_of_school_going_children`, `school_fees_expense`, `expenditure`, `disposable_income`, `what_is_the_land_tenor`, `Specify_other`, `value_of_land`, `own_any_farm_machinery`, `house_ownership`, `house_structure`, `Farm_size`, `total_land_size`, `Main_crop_enterprise_`, `landsize_main_crop_enterprise`, `additional_land_main_enterprise`, `yield_expected_main_enterprise`, `farm_at_residence`, `GPS_main_enterprise`) VALUES
(1, 'consent', 'farmers_name', 'any_disability', 'disability_type', 'own_a_mobile_phone', 'What_type_of_phone_do_you_own', 'No_of_contacts', 'tel_no1', 'tel_No_2', 'service_provider', 'Specify_svc_provider', 'mm_reg_status', 'registered_mm_number', 'nin', 'ID_photo_url', 'Photo_url', 'occupation', 'specify_other_occupation', 'Martial_status', 'What_is_your_gender', 'name_of_husband', 'number_of_wives_husbands', 'name_first_wife', 'name_second_wife', 'status_in_a_family', 'next_of_kin', 'next_of_kin_has_contact', 'next_of_kin_phone_no', 'region', 'district', 'other_district', 'subcounty', 'other_subcounty', 'subcounty_other_district', 'soiltype', 'parish', 'village', 'nearest_town', 'Local_council1_name', 'resident_since', 'Description_of_location ', 'DOB', 'level_of_education', 'head_of_the_household', 'Location', 'Mobile_literacy', 'any_dependants', 'dependant_no', 'dependants_age_bracket', 'farmer_org', 'name_of_farmer_org', 'position_in_FO', 'Your_position_in_the_fo', 'male_members_in_FO', 'female_members_in_FO', 'Affiliation', 'Name_of_connected_ACE_or_DFA', 'main_income_source', 'mainincome_since', 'sector', 'main_income_relaibility', 'main_income_amount', 'annual_income', 'other_income_sources', 'other_income_activity', 'years_of_experince', 'other_income_reliability ', 'amount', 'income_trend', 'access_to_Health_services', 'health_expense', 'school_going_children', 'no_of_school_going_children', 'school_fees_expense', 'expenditure', 'disposable_income', 'what_is_the_land_tenor', 'Specify_other', 'value_of_land', 'own_any_farm_machinery', 'house_ownership', 'house_structure', 'Farm_size', 'total_land_size', 'Main_crop_enterprise_', 'landsize_main_crop_enterprise', 'additional_land_main_enterprise ', 'yield_expected_main_enterprise', 'farm_at_residence', 'GPS_main_enterprise');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `centetable`
--
ALTER TABLE `centetable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `centetable`
--
ALTER TABLE `centetable`
  MODIFY `id` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
