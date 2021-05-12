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
  `id` int(13) NOT NULL,
  `consent` TEXT DEFAULT NULL,
  `farmers_name` TEXT DEFAULT NULL,
  `any_disability` TEXT DEFAULT NULL,
  `disability_type` TEXT DEFAULT NULL,
  `own_a_mobile_phone` TEXT DEFAULT NULL,
  `What_type_of_phone_do_you_own` TEXT DEFAULT NULL,
  `No_of_contacts` TEXT DEFAULT NULL,
  `tel_no1` TEXT DEFAULT NULL,
  `tel_No_2` TEXT DEFAULT NULL,
  `service_provider` TEXT DEFAULT NULL,
  `Specify_svc_provider` TEXT DEFAULT NULL,
  `mm_reg_status` TEXT DEFAULT NULL,
  `registered_mm_number` TEXT DEFAULT NULL,
  `nin` TEXT DEFAULT NULL,
  `ID_photo_url` TEXT DEFAULT NULL,
  `Photo_url` TEXT DEFAULT NULL,
  `occupation` TEXT DEFAULT NULL,
  `specify_other_occupation` TEXT DEFAULT NULL,
  `Martial_status` TEXT DEFAULT NULL,
  `What_is_your_gender` TEXT DEFAULT NULL,
  `name_of_husband` TEXT DEFAULT NULL,
  `number_of_wives_husbands` TEXT DEFAULT NULL,
  `name_first_wife` TEXT DEFAULT NULL,
  `name_second_wife` TEXT DEFAULT NULL,
  `status_in_a_family` TEXT DEFAULT NULL,
  `next_of_kin` TEXT DEFAULT NULL,
  `next_of_kin_has_contact` TEXT DEFAULT NULL,
  `next_of_kin_phone_no` TEXT DEFAULT NULL,
  `region` TEXT DEFAULT NULL,
  `district` TEXT DEFAULT NULL,
  `other_district` TEXT DEFAULT NULL,
  `subcounty` TEXT DEFAULT NULL,
  `other_subcounty` TEXT DEFAULT NULL,
  `subcounty_other_district` TEXT DEFAULT NULL,
  `soiltype` TEXT DEFAULT NULL,
  `parish` TEXT DEFAULT NULL,
  `village` TEXT DEFAULT NULL,
  `nearest_town` TEXT DEFAULT NULL,
  `Local_council1_name` TEXT DEFAULT NULL,
  `resident_since` TEXT DEFAULT NULL,
  `Description_of_location` TEXT DEFAULT NULL,
  `DOB` TEXT DEFAULT NULL,
  `level_of_education` TEXT DEFAULT NULL,
  `head_of_the_household` TEXT DEFAULT NULL,
  `_location` LONGTEXT DEFAULT NULL,
  `Mobile_literacy` TEXT DEFAULT NULL,
  `any_dependants` TEXT DEFAULT NULL,
  `dependant_no` TEXT DEFAULT NULL,
  `dependants_age_bracket` TEXT DEFAULT NULL,
  `farmer_org` TEXT DEFAULT NULL,
  `name_of_farmer_org` TEXT DEFAULT NULL,
  `belong_farmergp` TEXT DEFAULT NULL,
  `name_farmergp` TEXT DEFAULT NULL,
  `position_in_FO` TEXT DEFAULT NULL,
  `Your_position_in_the_fo` TEXT DEFAULT NULL,
  `male_members_in_FO` TEXT DEFAULT NULL,
  `female_members_in_FO` TEXT DEFAULT NULL,
  `Affiliation` TEXT DEFAULT NULL,
  `Name_of_connected_ACE_or_DFA` TEXT DEFAULT NULL,
  `main_income_source` TEXT DEFAULT NULL,
  `mainincome_since` TEXT DEFAULT NULL,
  `sector` TEXT DEFAULT NULL,
  `main_income_relaibility` TEXT DEFAULT NULL,
  `main_income_amount` TEXT DEFAULT NULL,
  `annual_income` TEXT DEFAULT NULL,
  `other_income_sources` TEXT DEFAULT NULL,
  `other_income_activity` TEXT DEFAULT NULL,
  `years_of_experince` TEXT DEFAULT NULL,
  `other_income_reliability` TEXT DEFAULT NULL,
  `amount` TEXT DEFAULT NULL,
  `income_trend` TEXT DEFAULT NULL,
  `access_to_Health_services` TEXT DEFAULT NULL,
  `health_expense` TEXT DEFAULT NULL,
  `school_going_children` TEXT DEFAULT NULL,
  `no_of_school_going_children` TEXT DEFAULT NULL,
  `school_fees_expense` TEXT DEFAULT NULL,
  `expenditure` TEXT DEFAULT NULL,
  `disposable_income` TEXT DEFAULT NULL,
  `what_is_the_land_tenor` TEXT DEFAULT NULL,
  `Specify_other` TEXT DEFAULT NULL,
  `value_of_land` TEXT DEFAULT NULL,
  `own_any_farm_machinery` TEXT DEFAULT NULL,
  `house_ownership` TEXT DEFAULT NULL,
  `house_structure` TEXT DEFAULT NULL,
  `Farm_size` TEXT DEFAULT NULL,
  `total_land_size` TEXT DEFAULT NULL,
  `Main_crop_enterprise_` TEXT DEFAULT NULL,
  `landsize_main_crop_enterprise` TEXT DEFAULT NULL,
  `additional_land_main_enterprise` TEXT DEFAULT NULL,
  `yield_expected_main_enterprise` TEXT DEFAULT NULL,
  `farm_at_residence` TEXT DEFAULT NULL,
  `GPS_main_enterprise` TEXT DEFAULT NULL,
  `yield_per_acre` TEXT DEFAULT NULL,
  `in_business_since` TEXT DEFAULT NULL,
  `Record_area_primary` TEXT DEFAULT NULL,
  `postharvest_mgt` TEXT DEFAULT NULL,
  `produce_storage` TEXT DEFAULT NULL,
  `preservation` TEXT DEFAULT NULL,
  `crops_for_new_season` TEXT DEFAULT NULL,
  `other_crops_intended` TEXT DEFAULT NULL,
  `landsize_cropselected` TEXT DEFAULT NULL,
  `number_of_employees` TEXT DEFAULT NULL,
  `livestock` TEXT DEFAULT NULL,
  `specify_livestock` TEXT DEFAULT NULL,
  `cattle_number` TEXT DEFAULT NULL,
  `goat_number` TEXT DEFAULT NULL,
  `sheep_number` TEXT DEFAULT NULL,
  `chicken_number` TEXT DEFAULT NULL,
  `pigs_number` TEXT DEFAULT NULL,
  `Donkey_number` TEXT DEFAULT NULL,
  `Did_you_plant_last_season` TEXT DEFAULT NULL,
  `crops_grown_last_season` TEXT DEFAULT NULL,
  `Specify_other_crops_grown` TEXT DEFAULT NULL,
  `yield_of_maize_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_beans_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_sesame_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_soyabean_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_rice_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_millet_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_sorghum_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_irish_potatoes_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_cotton_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_sweet_potatoes_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_sunflower_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_ground_nuts_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_coffee_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_Banana_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `yield_of_cassava_with_adequate_rain_per_acre` TEXT DEFAULT NULL,
  `crops_stored_from_last_season` TEXT DEFAULT NULL,
  `storage_time` TEXT DEFAULT NULL,
  `disturbances_in_storage` TEXT DEFAULT NULL,
  `Specify_others` TEXT DEFAULT NULL,
  `maize_per_kg` TEXT DEFAULT NULL,
  `beans_per_kg` TEXT DEFAULT NULL,
  `sesame_per_kg` TEXT DEFAULT NULL,
  `soyabean_per_kg` TEXT DEFAULT NULL,
  `rice_per_kg` TEXT DEFAULT NULL,
  `millet_per_kg` TEXT DEFAULT NULL,
  `sorghum_per_kg` TEXT DEFAULT NULL,
  `irish_potatoes_per_kg` TEXT DEFAULT NULL,
  `cotton_per_kg` TEXT DEFAULT NULL,
  `sweet_potatoes_per_kg` TEXT DEFAULT NULL,
  `sunflower_per_kg` TEXT DEFAULT NULL,
  `ground_nuts_per_kg` TEXT DEFAULT NULL,
  `coffee_per_kg` TEXT DEFAULT NULL,
  `banana_per_bunch` TEXT DEFAULT NULL,
  `cassava_per_kg` TEXT DEFAULT NULL,
  `Did_you_apply_fertilizer` TEXT DEFAULT NULL,
  `Specify_the_type` TEXT DEFAULT NULL,
  `organic_specify` TEXT DEFAULT NULL,
  `Specify_other_organic` TEXT DEFAULT NULL,
  `inorganic_Specify` TEXT DEFAULT NULL,
  `use_pesticides_or_herbicides` TEXT DEFAULT NULL,
  `Please_specify_which_one` TEXT DEFAULT NULL,
  `pesticide_effectiveness` TEXT DEFAULT NULL,
  `crop_use` TEXT DEFAULT NULL,
  `involved_in_marketing` TEXT DEFAULT NULL,
  `sell_of_produce_Nyakyera` TEXT DEFAULT NULL,
  `sell_of_produce_green` TEXT DEFAULT NULL,
  `sell_of_produce_equator` TEXT DEFAULT NULL,
  `sell_of_produce_liraresort` TEXT DEFAULT NULL,
  `sell_of_produce_cedo` TEXT DEFAULT NULL,
  `sell_of_produce_orum` TEXT DEFAULT NULL,
  `Marketlink` TEXT DEFAULT NULL,
  `agent_name` TEXT DEFAULT NULL,
  `produce_transport` TEXT DEFAULT NULL,
  `employ_any_farm_labour` TEXT DEFAULT NULL,
  `Specify_their_task` TEXT DEFAULT NULL,
  `Who_assisted_you` TEXT DEFAULT NULL,
  `How_much_did_you_pay_them` TEXT DEFAULT NULL,
  `Are_you_aware_of_climate_shock` TEXT DEFAULT NULL,
  `which_ones_you_are_aware_of` TEXT DEFAULT NULL,
  `training_on_addressing_climate` TEXT DEFAULT NULL,
  `Please_specify` TEXT DEFAULT NULL,
  `Which_crops_for_rotation` TEXT DEFAULT NULL,
  `knoledge_of_rain_date` TEXT DEFAULT NULL,
  `heard_of_agri_insurance` TEXT DEFAULT NULL,
  `access_to_agri_insurance` TEXT DEFAULT NULL,
  `Please_specify_the_agri_insurance_type` TEXT DEFAULT NULL,
  `Specify_the_insurance_provider` TEXT DEFAULT NULL,
  `fair_charge_for_insurance` TEXT DEFAULT NULL,
  `prefer_ordinary_or_az_bunlde` TEXT DEFAULT NULL,
  `challenges_last_season` TEXT DEFAULT NULL,
  `Specify` TEXT DEFAULT NULL,
  `What_type_of_pests` TEXT DEFAULT NULL,
  `type_of_weather_and_effect` TEXT DEFAULT NULL,
  `Do_you_have_a_bank_account` TEXT DEFAULT NULL,
  `financial_access` TEXT DEFAULT NULL,
  `transaction_monthly_costs` TEXT DEFAULT NULL,
  `Specify_other_monthly_transaction_costs` TEXT DEFAULT NULL,
  `travel_distance` TEXT DEFAULT NULL,
  `specify_other_travel_distance` TEXT DEFAULT NULL,
  `Have_you_ever_received_credit` TEXT DEFAULT NULL,
  `no_of_times_borrowed` TEXT DEFAULT NULL,
  `loanoutstanding` TEXT DEFAULT NULL,
  `How_much_repayment_was_made_per_month` TEXT DEFAULT NULL,
  `delay_time_for_repayment` TEXT DEFAULT NULL,
  `How_do_you_keep_your_money` TEXT DEFAULT NULL,
  `financial_transaction_challeng` TEXT DEFAULT NULL,
  `Specify_Other_financial_transaction_challeng` TEXT DEFAULT NULL,
  `action_access_to_financial_svc` TEXT DEFAULT NULL,
  `access_to_agric_ext_services` TEXT DEFAULT NULL,
  `How_do_you_access_Agric_ext_sv` TEXT DEFAULT NULL,
  `extension_type_channel_receive` TEXT DEFAULT NULL,
  `adopted_practices` TEXT DEFAULT NULL,
  `most_mostadoptedpractice` TEXT DEFAULT NULL,
  `Rate_services_training` TEXT DEFAULT NULL,
  `frequently_access_ext_svcs` TEXT DEFAULT NULL,
  `is_information_provided_accurt` TEXT DEFAULT NULL,
  `trainingappropriate` TEXT DEFAULT NULL,
  `benefits_of_practices` TEXT DEFAULT NULL,
  `pay_anything_to_access_ext_svc` TEXT DEFAULT NULL,
  `training` TEXT DEFAULT NULL,
  `pay_per_season` TEXT DEFAULT NULL,
  `pest_fertilizer_pesticide_info` TEXT DEFAULT NULL,
  `Do_you_receive_weather_data` TEXT DEFAULT NULL,
  `access_to_weather_data` TEXT DEFAULT NULL,
  `How_accurate_is_the_info` TEXT DEFAULT NULL,
  `most_harmful_info` TEXT DEFAULT NULL,
  `biggest_prob_in_data_access` TEXT DEFAULT NULL,
  `spend_on_your_phone_monthly` TEXT DEFAULT NULL,
  `main_phone_use` TEXT DEFAULT NULL,
  `subscribed_to_info_svces_on_ph` TEXT DEFAULT NULL,
  `services_suscribed_to` TEXT DEFAULT NULL,
  `training_on_using_phone_servic` TEXT DEFAULT NULL,
  `training_on_weather_alerts` TEXT DEFAULT NULL,
  `Who_provided_the_training_on_weather_alerts` TEXT DEFAULT NULL,
  `trainig_on_insurance` TEXT DEFAULT NULL,
  `Who_provided_the_training_on_insurance` TEXT DEFAULT NULL,
  `probs_of_using_cellphone` TEXT DEFAULT NULL,
  `field_officer` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `centetable`
--

INSERT INTO `centetable` (`id`, `consent`, `farmers_name`, `any_disability`, `disability_type`, `own_a_mobile_phone`, `What_type_of_phone_do_you_own`, `No_of_contacts`, `tel_no1`, `tel_No_2`, `service_provider`, `Specify_svc_provider`, `mm_reg_status`, `registered_mm_number`, `nin`, `ID_photo_url`, `Photo_url`, `occupation`, `specify_other_occupation`, `Martial_status`, `What_is_your_gender`, `name_of_husband`, `number_of_wives_husbands`, `name_first_wife`, `name_second_wife`, `status_in_a_family`, `next_of_kin`, `next_of_kin_has_contact`, `next_of_kin_phone_no`, `region`, `district`, `other_district`, `subcounty`, `other_subcounty`, `subcounty_other_district`, `soiltype`, `parish`, `village`, `nearest_town`, `Local_council1_name`, `resident_since`, `Description_of_location`, `DOB`, `level_of_education`, `head_of_the_household`, `_location`, `Mobile_literacy`, `any_dependants`, `dependant_no`, `dependants_age_bracket`, `farmer_org`, `name_of_farmer_org`, `belong_farmergp`, `name_farmergp`, `position_in_FO`, `Your_position_in_the_fo`, `male_members_in_FO`, `female_members_in_FO`, `Affiliation`, `Name_of_connected_ACE_or_DFA`, `main_income_source`, `mainincome_since`, `sector`, `main_income_relaibility`, `main_income_amount`, `annual_income`, `other_income_sources`, `other_income_activity`, `years_of_experince`, `other_income_reliability`, `amount`, `income_trend`, `access_to_Health_services`, `health_expense`, `school_going_children`, `no_of_school_going_children`, `school_fees_expense`, `expenditure`, `disposable_income`, `what_is_the_land_tenor`, `Specify_other`, `value_of_land`, `own_any_farm_machinery`, `house_ownership`, `house_structure`, `Farm_size`, `total_land_size`, `Main_crop_enterprise_`, `landsize_main_crop_enterprise`, `additional_land_main_enterprise`, `yield_expected_main_enterprise`, `farm_at_residence`, `GPS_main_enterprise`, `yield_per_acre`, `in_business_since`, `Record_area_primary`, `postharvest_mgt`, `produce_storage`, `preservation`, `crops_for_new_season`, `other_crops_intended`, `landsize_cropselected`, `number_of_employees`, `livestock`, `specify_livestock`, `cattle_number`, `goat_number`, `sheep_number`, `chicken_number`, `pigs_number`, `Donkey_number`, `Did_you_plant_last_season`, `crops_grown_last_season`, `Specify_other_crops_grown`, `yield_of_maize_with_adequate_rain_per_acre`, `yield_of_beans_with_adequate_rain_per_acre`, `yield_of_sesame_with_adequate_rain_per_acre`, `yield_of_soyabean_with_adequate_rain_per_acre`, `yield_of_rice_with_adequate_rain_per_acre`, `yield_of_millet_with_adequate_rain_per_acre`, `yield_of_sorghum_with_adequate_rain_per_acre`, `yield_of_irish_potatoes_with_adequate_rain_per_acre`, `yield_of_cotton_with_adequate_rain_per_acre`, `yield_of_sweet_potatoes_with_adequate_rain_per_acre`, `yield_of_sunflower_with_adequate_rain_per_acre`, `yield_of_ground_nuts_with_adequate_rain_per_acre`, `yield_of_coffee_with_adequate_rain_per_acre`, `yield_of_Banana_with_adequate_rain_per_acre`, `yield_of_cassava_with_adequate_rain_per_acre`, `crops_stored_from_last_season`, `storage_time`, `disturbances_in_storage`, `Specify_others`, `maize_per_kg`, `beans_per_kg`, `sesame_per_kg`, `soyabean_per_kg`, `rice_per_kg`, `millet_per_kg`, `sorghum_per_kg`, `irish_potatoes_per_kg`, `cotton_per_kg`, `sweet_potatoes_per_kg`, `sunflower_per_kg`, `ground_nuts_per_kg`, `coffee_per_kg`, `banana_per_bunch`, `cassava_per_kg`, `Did_you_apply_fertilizer`, `Specify_the_type`, `organic_specify`, `Specify_other_organic`, `inorganic_Specify`, `use_pesticides_or_herbicides`, `Please_specify_which_one`, `pesticide_effectiveness`, `crop_use`, `involved_in_marketing`, `sell_of_produce_Nyakyera`, `sell_of_produce_green`, `sell_of_produce_equator`, `sell_of_produce_liraresort`, `sell_of_produce_cedo`, `sell_of_produce_orum`, `Marketlink`, `agent_name`, `produce_transport`, `employ_any_farm_labour`, `Specify_their_task`, `Who_assisted_you`, `How_much_did_you_pay_them`, `Are_you_aware_of_climate_shock`, `which_ones_you_are_aware_of`, `training_on_addressing_climate`, `Please_specify`, `Which_crops_for_rotation`, `knoledge_of_rain_date`, `heard_of_agri_insurance`, `access_to_agri_insurance`, `Please_specify_the_agri_insurance_type`, `Specify_the_insurance_provider`, `fair_charge_for_insurance`, `prefer_ordinary_or_az_bunlde`, `challenges_last_season`, `Specify`, `What_type_of_pests`, `type_of_weather_and_effect`, `Do_you_have_a_bank_account`, `financial_access`, `transaction_monthly_costs`, `Specify_other_monthly_transaction_costs`, `travel_distance`, `specify_other_travel_distance`, `Have_you_ever_received_credit`, `no_of_times_borrowed`, `loanoutstanding`, `How_much_repayment_was_made_per_month`, `delay_time_for_repayment`, `How_do_you_keep_your_money`, `financial_transaction_challeng`, `Specify_Other_financial_transaction_challeng`, `action_access_to_financial_svc`, `access_to_agric_ext_services`, `How_do_you_access_Agric_ext_sv`, `extension_type_channel_receive`, `adopted_practices`, `most_mostadoptedpractice`, `Rate_services_training`, `frequently_access_ext_svcs`, `is_information_provided_accurt`, `trainingappropriate`, `benefits_of_practices`, `pay_anything_to_access_ext_svc`, `training`, `pay_per_season`, `pest_fertilizer_pesticide_info`, `Do_you_receive_weather_data`, `access_to_weather_data`, `How_accurate_is_the_info`, `most_harmful_info`, `biggest_prob_in_data_access`, `spend_on_your_phone_monthly`, `main_phone_use`, `subscribed_to_info_svces_on_ph`, `services_suscribed_to`, `training_on_using_phone_servic`, `training_on_weather_alerts`, `Who_provided_the_training_on_weather_alerts`, `trainig_on_insurance`, `Who_provided_the_training_on_insurance`, `probs_of_using_cellphone`, `field_officer`) VALUES
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
  MODIFY `id` int(13) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
