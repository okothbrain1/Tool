-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2021 at 05:28 AM
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
  `id` int(11) NOT NULL,
  `consent` varchar(7) DEFAULT NULL,
  `farmers_name` text DEFAULT NULL,
  `any_disability` text DEFAULT NULL,
  `disability_type` text DEFAULT NULL,
  `own_a_mobile_phone` text DEFAULT NULL,
  `What_type_of_phone_do_you_own` text DEFAULT NULL,
  `No_of_contacts` text DEFAULT NULL,
  `tel_no1` int(11) DEFAULT NULL,
  `tel_No_2` int(11) DEFAULT NULL,
  `service_provider` text DEFAULT NULL,
  `Specify_svc_provider` text DEFAULT NULL,
  `mm_reg_status` text DEFAULT NULL,
  `registered_mm_number` text DEFAULT NULL,
  `nin` text DEFAULT NULL,
  `ID_photo_url` text DEFAULT NULL,
  `Photo_url` text DEFAULT NULL,
  `occupation` text DEFAULT NULL,
  `specify_other_occupation` text DEFAULT NULL,
  `Martial_status` text DEFAULT NULL,
  `What_is_your_gender` text DEFAULT NULL,
  `name_of_husband` int(13) DEFAULT NULL,
  `number_of_wives_husbands` int(13) DEFAULT NULL,
  `name_first_wife` text DEFAULT NULL,
  `name_second_wife` text DEFAULT NULL,
  `status_in_a_family` text DEFAULT NULL,
  `next_of_kin` text DEFAULT NULL,
  `next_of_kin_has_contact` text DEFAULT NULL,
  `next_of_kin_phone_no` text DEFAULT NULL,
  `region` text DEFAULT NULL,
  `district` text DEFAULT NULL,
  `other_district` text DEFAULT NULL,
  `subcounty` text DEFAULT NULL,
  `other_subcounty` text DEFAULT NULL,
  `subcounty_other_district` text DEFAULT NULL,
  `soiltype` text DEFAULT NULL,
  `parish` text DEFAULT NULL,
  `village` text DEFAULT NULL,
  `nearest_town` text DEFAULT NULL,
  `Local_council1_name` text DEFAULT NULL,
  `resident_since` date DEFAULT NULL,
  `Description_of_location` text DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `level_of_education` text DEFAULT NULL,
  `head_of_the_household` varchar(21) DEFAULT NULL,
  `Location` text DEFAULT NULL,
  `Mobile_literacy` text DEFAULT NULL,
  `any_dependants` text DEFAULT NULL,
  `dependant_no` int(12) DEFAULT NULL,
  `dependants_age_bracket` text DEFAULT NULL,
  `farmer_org` text DEFAULT NULL,
  `name_of_farmer_org` text DEFAULT NULL,
  `belong_farmergp` text DEFAULT NULL,
  `name_farmergp` text DEFAULT NULL,
  `position_in_FO` text DEFAULT NULL,
  `Your_position_in_the_fo` text DEFAULT NULL,
  `male_members_in_FO` int(13) DEFAULT NULL,
  `female_members_in_FO` int(13) DEFAULT NULL,
  `Affiliation` text DEFAULT NULL,
  `Name_of_connected_ACE_or_DFA` text DEFAULT NULL,
  `main_income_source` varchar(18) DEFAULT NULL,
  `mainincome_since` varchar(16) DEFAULT NULL,
  `sector` varchar(6) DEFAULT NULL,
  `main_income_relaibility` varchar(23) DEFAULT NULL,
  `main_income_amount` varchar(18) DEFAULT NULL,
  `annual_income` varchar(13) DEFAULT NULL,
  `other_income_sources` varchar(20) DEFAULT NULL,
  `other_income_activity` varchar(21) DEFAULT NULL,
  `years_of_experince` varchar(18) DEFAULT NULL,
  `other_income_reliability` varchar(24) DEFAULT NULL,
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
  `own_any_farm_machinery` text DEFAULT NULL,
  `house_ownership` varchar(15) DEFAULT NULL,
  `house_structure` varchar(15) DEFAULT NULL,
  `Farm_size` varchar(9) DEFAULT NULL,
  `total_land_size` varchar(15) DEFAULT NULL,
  `Main_crop_enterprise_` varchar(21) DEFAULT NULL,
  `landsize_main_crop_enterprise` varchar(29) DEFAULT NULL,
  `additional_land_main_enterprise` varchar(31) DEFAULT NULL,
  `yield_expected_main_enterprise` varchar(30) DEFAULT NULL,
  `farm_at_residence` varchar(17) DEFAULT NULL,
  `GPS_main_enterprise` varchar(19) DEFAULT NULL,
  `yield_per_acre` varchar(30) DEFAULT NULL,
  `in_business_since` varchar(15) DEFAULT NULL,
  `Record_area_primary` varchar(19) DEFAULT NULL,
  `postharvest_mgt` varchar(15) DEFAULT NULL,
  `produce_storage` varchar(15) DEFAULT NULL,
  `preservation` varchar(12) DEFAULT NULL,
  `crops_for_new_season` varchar(20) DEFAULT NULL,
  `other_crops_intended` varchar(20) DEFAULT NULL,
  `landsize_cropselected` varchar(50) DEFAULT NULL,
  `number_of_employees` varchar(19) DEFAULT NULL,
  `livestock` text DEFAULT NULL,
  `specify_livestock` text DEFAULT NULL,
  `cattle_number` int(13) DEFAULT NULL,
  `goat_number` int(11) DEFAULT NULL,
  `sheep_number` int(12) DEFAULT NULL,
  `chicken_number` int(14) DEFAULT NULL,
  `pigs_number` int(11) DEFAULT NULL,
  `Donkey_number` int(13) DEFAULT NULL,
  `Did_you_plant_last_season` varchar(25) DEFAULT NULL,
  `crops_grown_last_season` varchar(23) DEFAULT NULL,
  `Specify_other_crops_grown` varchar(25) DEFAULT NULL,
  `yield_of_maize_with_adequate_rain_per_acre` varchar(42) DEFAULT NULL,
  `yield_of_beans_with_adequate_rain_per_acre` varchar(42) DEFAULT NULL,
  `yield_of_sesame_with_adequate_rain_per_acre` varchar(43) DEFAULT NULL,
  `yield_of_soyabean_with_adequate_rain_per_acre` varchar(45) DEFAULT NULL,
  `yield_of_rice_with_adequate_rain_per_acre` varchar(41) DEFAULT NULL,
  `yield_of_millet_with_adequate_rain_per_acre` varchar(43) DEFAULT NULL,
  `yield_of_sorghum_with_adequate_rain_per_acre` varchar(44) DEFAULT NULL,
  `yield_of_irish_potatoes_with_adequate_rain_per_acre` varchar(51) DEFAULT NULL,
  `yield_of_cotton_with_adequate_rain_per_acre` varchar(43) DEFAULT NULL,
  `yield_of_sweet_potatoes_with_adequate_rain_per_acre` varchar(51) DEFAULT NULL,
  `yield_of_sunflower_with_adequate_rain_per_acre` varchar(46) DEFAULT NULL,
  `yield_of_ground_nuts_with_adequate_rain_per_acre` varchar(48) DEFAULT NULL,
  `yield_of_coffee_with_adequate_rain_per_acre` varchar(43) DEFAULT NULL,
  `yield_of_Banana_with_adequate_rain_per_acre` varchar(43) DEFAULT NULL,
  `yield_of_cassava_with_adequate_rain_per_acre` varchar(44) DEFAULT NULL,
  `crops_stored_from_last_season` varchar(29) DEFAULT NULL,
  `storage_time` varchar(12) DEFAULT NULL,
  `disturbances_in_storage` varchar(23) DEFAULT NULL,
  `Specify_others` varchar(14) DEFAULT NULL,
  `maize_per_kg` int(13) DEFAULT NULL,
  `beans_per_kg` int(13) DEFAULT NULL,
  `sesame_per_kg` int(13) DEFAULT NULL,
  `soyabean_per_kg` int(13) DEFAULT NULL,
  `rice_per_kg` int(13) DEFAULT NULL,
  `millet_per_kg` int(13) DEFAULT NULL,
  `sorghum_per_kg` int(13) DEFAULT NULL,
  `irish_potatoes_per_kg` int(13) DEFAULT NULL,
  `cotton_per_kg` int(13) DEFAULT NULL,
  `sweet_potatoes_per_kg` int(13) DEFAULT NULL,
  `sunflower_per_kg` int(13) DEFAULT NULL,
  `ground_nuts_per_kg` int(13) DEFAULT NULL,
  `coffee_per_kg` int(13) DEFAULT NULL,
  `banana_per_bunch` int(13) DEFAULT NULL,
  `cassava_per_kg` int(13) DEFAULT NULL,
  `Did_you_apply_fertilizer` text DEFAULT NULL,
  `Specify_the_type` text DEFAULT NULL,
  `organic_specify` text DEFAULT NULL,
  `Specify_other_organic` text DEFAULT NULL,
  `inorganic_Specify` text DEFAULT NULL,
  `use_pesticides_or_herbicides` text DEFAULT NULL,
  `Please_specify_which_one` text DEFAULT NULL,
  `pesticide_effectiveness` text DEFAULT NULL,
  `crop_use` text DEFAULT NULL,
  `involved_in_marketing` text DEFAULT NULL,
  `sell_of_produce_Nyakyera` text DEFAULT NULL,
  `sell_of_produce_green` text DEFAULT NULL,
  `sell_of_produce_equator` text DEFAULT NULL,
  `sell_of_produce_liraresort` text DEFAULT NULL,
  `sell_of_produce_cedo` text DEFAULT NULL,
  `sell_of_produce_orum` text DEFAULT NULL,
  `Marketlink` text DEFAULT NULL,
  `agent_name` text DEFAULT NULL,
  `produce_transport` text DEFAULT NULL,
  `employ_any_farm_labour` text DEFAULT NULL,
  `Specify_their_task` text DEFAULT NULL,
  `Who_assisted_you` text DEFAULT NULL,
  `How_much_did_you_pay_them` int(11) DEFAULT NULL,
  `Are_you_aware_of_climate_shock` text DEFAULT NULL,
  `which_ones_you_are_aware_of` text DEFAULT NULL,
  `training_on_addressing_climate` text DEFAULT NULL,
  `Please_specify` text DEFAULT NULL,
  `Which_crops_for_rotation` text DEFAULT NULL,
  `knoledge_of_rain_date` text DEFAULT NULL,
  `heard_of_agri_insurance` text DEFAULT NULL,
  `access_to_agri_insurance` text DEFAULT NULL,
  `Please_specify_the_agri_insurance_type` int(11) DEFAULT NULL,
  `Specify_the_insurance_provider` text DEFAULT NULL,
  `fair_charge_for_insurance` int(11) DEFAULT NULL,
  `prefer_ordinary_or_az_bunlde` text DEFAULT NULL,
  `challenges_last_season` text DEFAULT NULL,
  `Specify` text DEFAULT NULL,
  `What_type_of_pests` text DEFAULT NULL,
  `type_of_weather_and_effect` text DEFAULT NULL,
  `Do_you_have_a_bank_account` text DEFAULT NULL,
  `financial_access` text DEFAULT NULL,
  `transaction_monthly_costs` text DEFAULT NULL,
  `Specify_other_monthly_transaction_costs` text DEFAULT NULL,
  `travel_distance` text DEFAULT NULL,
  `specify_other_travel_distance` text DEFAULT NULL,
  `Have_you_ever_received_credit` text DEFAULT NULL,
  `no_of_times_borrowed` text DEFAULT NULL,
  `loanoutstanding` text DEFAULT NULL,
  `How_much_repayment_was_made_per_month` int(11) DEFAULT NULL,
  `delay_time_for_repayment` text DEFAULT NULL,
  `How_do_you_keep_your_money` text DEFAULT NULL,
  `financial_transaction_challeng` text DEFAULT NULL,
  `Specify_Other_financial_transaction_challeng` text DEFAULT NULL,
  `action_access_to_financial_svc` text DEFAULT NULL,
  `access_to_agric_ext_services` text DEFAULT NULL,
  `How_do_you_access_Agric_ext_sv` text DEFAULT NULL,
  `extension_type_channel_receive` text DEFAULT NULL,
  `adopted_practices` text DEFAULT NULL,
  `most_mostadoptedpractice` text DEFAULT NULL,
  `Rate_services_training` int(13) DEFAULT NULL,
  `frequently_access_ext_svcs` int(13) DEFAULT NULL,
  `is_information_provided_accurt` text DEFAULT NULL,
  `trainingappropriate` text DEFAULT NULL,
  `benefits_of_practices` text DEFAULT NULL,
  `pay_anything_to_access_ext_svc` text DEFAULT NULL,
  `training` text DEFAULT NULL,
  `pay_per_season` int(13) DEFAULT NULL,
  `pest_fertilizer_pesticide_info` text DEFAULT NULL,
  `Do_you_receive_weather_data` text DEFAULT NULL,
  `access_to_weather_data` text DEFAULT NULL,
  `How_accurate_is_the_info` text DEFAULT NULL,
  `most_harmful_info` text DEFAULT NULL,
  `biggest_prob_in_data_access` text DEFAULT NULL,
  `spend_on_your_phone_monthly` int(13) DEFAULT NULL,
  `main_phone_use` text DEFAULT NULL,
  `subscribed_to_info_svces_on_ph` text DEFAULT NULL,
  `services_suscribed_to` text DEFAULT NULL,
  `training_on_using_phone_servic` text DEFAULT NULL,
  `training_on_weather_alerts` text DEFAULT NULL,
  `Who_provided_the_training_on_weather_alerts` text DEFAULT NULL,
  `trainig_on_insurance` text DEFAULT NULL,
  `Who_provided_the_training_on_insurance` text DEFAULT NULL,
  `probs_of_using_cellphone` text DEFAULT NULL,
  `field_officer` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `centetable`
--

INSERT INTO `centetable` (`id`, `consent`, `farmers_name`, `any_disability`, `disability_type`, `own_a_mobile_phone`, `What_type_of_phone_do_you_own`, `No_of_contacts`, `tel_no1`, `tel_No_2`, `service_provider`, `Specify_svc_provider`, `mm_reg_status`, `registered_mm_number`, `nin`, `ID_photo_url`, `Photo_url`, `occupation`, `specify_other_occupation`, `Martial_status`, `What_is_your_gender`, `name_of_husband`, `number_of_wives_husbands`, `name_first_wife`, `name_second_wife`, `status_in_a_family`, `next_of_kin`, `next_of_kin_has_contact`, `next_of_kin_phone_no`, `region`, `district`, `other_district`, `subcounty`, `other_subcounty`, `subcounty_other_district`, `soiltype`, `parish`, `village`, `nearest_town`, `Local_council1_name`, `resident_since`, `Description_of_location`, `DOB`, `level_of_education`, `head_of_the_household`, `Location`, `Mobile_literacy`, `any_dependants`, `dependant_no`, `dependants_age_bracket`, `farmer_org`, `name_of_farmer_org`, `belong_farmergp`, `name_farmergp`, `position_in_FO`, `Your_position_in_the_fo`, `male_members_in_FO`, `female_members_in_FO`, `Affiliation`, `Name_of_connected_ACE_or_DFA`, `main_income_source`, `mainincome_since`, `sector`, `main_income_relaibility`, `main_income_amount`, `annual_income`, `other_income_sources`, `other_income_activity`, `years_of_experince`, `other_income_reliability`, `amount`, `income_trend`, `access_to_Health_services`, `health_expense`, `school_going_children`, `no_of_school_going_children`, `school_fees_expense`, `expenditure`, `disposable_income`, `what_is_the_land_tenor`, `Specify_other`, `value_of_land`, `own_any_farm_machinery`, `house_ownership`, `house_structure`, `Farm_size`, `total_land_size`, `Main_crop_enterprise_`, `landsize_main_crop_enterprise`, `additional_land_main_enterprise`, `yield_expected_main_enterprise`, `farm_at_residence`, `GPS_main_enterprise`, `yield_per_acre`, `in_business_since`, `Record_area_primary`, `postharvest_mgt`, `produce_storage`, `preservation`, `crops_for_new_season`, `other_crops_intended`, `landsize_cropselected`, `number_of_employees`, `livestock`, `specify_livestock`, `cattle_number`, `goat_number`, `sheep_number`, `chicken_number`, `pigs_number`, `Donkey_number`, `Did_you_plant_last_season`, `crops_grown_last_season`, `Specify_other_crops_grown`, `yield_of_maize_with_adequate_rain_per_acre`, `yield_of_beans_with_adequate_rain_per_acre`, `yield_of_sesame_with_adequate_rain_per_acre`, `yield_of_soyabean_with_adequate_rain_per_acre`, `yield_of_rice_with_adequate_rain_per_acre`, `yield_of_millet_with_adequate_rain_per_acre`, `yield_of_sorghum_with_adequate_rain_per_acre`, `yield_of_irish_potatoes_with_adequate_rain_per_acre`, `yield_of_cotton_with_adequate_rain_per_acre`, `yield_of_sweet_potatoes_with_adequate_rain_per_acre`, `yield_of_sunflower_with_adequate_rain_per_acre`, `yield_of_ground_nuts_with_adequate_rain_per_acre`, `yield_of_coffee_with_adequate_rain_per_acre`, `yield_of_Banana_with_adequate_rain_per_acre`, `yield_of_cassava_with_adequate_rain_per_acre`, `crops_stored_from_last_season`, `storage_time`, `disturbances_in_storage`, `Specify_others`, `maize_per_kg`, `beans_per_kg`, `sesame_per_kg`, `soyabean_per_kg`, `rice_per_kg`, `millet_per_kg`, `sorghum_per_kg`, `irish_potatoes_per_kg`, `cotton_per_kg`, `sweet_potatoes_per_kg`, `sunflower_per_kg`, `ground_nuts_per_kg`, `coffee_per_kg`, `banana_per_bunch`, `cassava_per_kg`, `Did_you_apply_fertilizer`, `Specify_the_type`, `organic_specify`, `Specify_other_organic`, `inorganic_Specify`, `use_pesticides_or_herbicides`, `Please_specify_which_one`, `pesticide_effectiveness`, `crop_use`, `involved_in_marketing`, `sell_of_produce_Nyakyera`, `sell_of_produce_green`, `sell_of_produce_equator`, `sell_of_produce_liraresort`, `sell_of_produce_cedo`, `sell_of_produce_orum`, `Marketlink`, `agent_name`, `produce_transport`, `employ_any_farm_labour`, `Specify_their_task`, `Who_assisted_you`, `How_much_did_you_pay_them`, `Are_you_aware_of_climate_shock`, `which_ones_you_are_aware_of`, `training_on_addressing_climate`, `Please_specify`, `Which_crops_for_rotation`, `knoledge_of_rain_date`, `heard_of_agri_insurance`, `access_to_agri_insurance`, `Please_specify_the_agri_insurance_type`, `Specify_the_insurance_provider`, `fair_charge_for_insurance`, `prefer_ordinary_or_az_bunlde`, `challenges_last_season`, `Specify`, `What_type_of_pests`, `type_of_weather_and_effect`, `Do_you_have_a_bank_account`, `financial_access`, `transaction_monthly_costs`, `Specify_other_monthly_transaction_costs`, `travel_distance`, `specify_other_travel_distance`, `Have_you_ever_received_credit`, `no_of_times_borrowed`, `loanoutstanding`, `How_much_repayment_was_made_per_month`, `delay_time_for_repayment`, `How_do_you_keep_your_money`, `financial_transaction_challeng`, `Specify_Other_financial_transaction_challeng`, `action_access_to_financial_svc`, `access_to_agric_ext_services`, `How_do_you_access_Agric_ext_sv`, `extension_type_channel_receive`, `adopted_practices`, `most_mostadoptedpractice`, `Rate_services_training`, `frequently_access_ext_svcs`, `is_information_provided_accurt`, `trainingappropriate`, `benefits_of_practices`, `pay_anything_to_access_ext_svc`, `training`, `pay_per_season`, `pest_fertilizer_pesticide_info`, `Do_you_receive_weather_data`, `access_to_weather_data`, `How_accurate_is_the_info`, `most_harmful_info`, `biggest_prob_in_data_access`, `spend_on_your_phone_monthly`, `main_phone_use`, `subscribed_to_info_svces_on_ph`, `services_suscribed_to`, `training_on_using_phone_servic`, `training_on_weather_alerts`, `Who_provided_the_training_on_weather_alerts`, `trainig_on_insurance`, `Who_provided_the_training_on_insurance`, `probs_of_using_cellphone`, `field_officer`) VALUES
(302, '1', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 'upload/607df2ad65e50.png', 'upload/607df2ad65a14.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', ''),
(303, '1', 'okoth', 'Yes', 'vision Impairment', '', '', '', 0, 0, '', '', '', '', '', 'upload/607df49c0a82e.png', 'upload/607df49c0a57c.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', ''),
(304, '1', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 'upload/607df5d32b13c.png', 'upload/607df5d32af41.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'freeMan'),
(305, '1', 'wwwww', '', '', '', '', '', 0, 0, '', '', '', '', '', 'upload/607df5dcce177.png', 'upload/607df5dccdec7.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'freeMan'),
(306, '1', 'wwwww', '', '', '', '', '', 0, 0, '', '', '', '', '', 'upload/607df5f11e108.png', 'upload/607df5f11de1d.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'freeMan'),
(307, '1', 'okoth', 'No', '', 'Yes', 'Feature phone', '2', 75682334, 78889999, 'MTN', '', 'yes_but_dormant', '', '', 'upload/607df75bb186f.png', 'upload/607df75bb15e5.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'freeMan'),
(308, '1', 'oko', 'Yes', '', '', '', '', 0, 0, '', '', '', '', '', 'upload/607e098a2ab6a.png', 'upload/607e098a2a486.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'obrain'),
(309, '1', 'freekick', 'Yes', 'Mental health conditions', 'Yes', '', '', 0, 0, '', '', '', '', '', 'upload/607e0a0e7503d.png', 'upload/607e0a0e746f4.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'obrain'),
(310, '1', 'freekick', 'Yes', 'Mental health conditions', 'Yes', '', '', 0, 0, '', '', '', '', '', 'upload/607e0a1dc2c95.png', 'upload/607e0a1dc294c.png', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '0000-00-00', '', '', '', '', '', 0, '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, '', NULL, NULL, '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', NULL, '', '', NULL, '', '', '', '', NULL, '', '', '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', 'obrain');

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
  MODIFY `id` int(13) DEFAULT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
