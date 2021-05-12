<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','testdb');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$postjson = json_decode(file_get_contents('php://input'), true);
date_default_timezone_set('Africa/Nairobi');

$today = date('Y-m-d H:i:s');
$null = 'Null';
$completed = 'Yes';

if($postjson['aski']=="submit"){
    //Getting the multiple values of dependant age bracket
    $dependant_ages=$postjson['dependants_age_bracket'];
    $dependant="";
    foreach($dependant_ages as $dependant_age){
      $dependant.= $dependant_age . ",";
    }
    //Getting the multiple value of Specify_their_task
    $specify_tasks=$postjson['Specify_their_task'];
    $task="";
    foreach($specify_tasks as $specify_task){
      $task.= $specify_task . ",";
    }
      
    //Getting the multiple values for in_organic
    $inorganics=$postjson['inorganic_Specify'];
    $inorgan="";
    foreach($inorganics as $inorganic){
      $inorgan.= $inorganic . ",";
    }
    
    $crops_grown_last=$postjson['crops_grown_last_season'];
    $crops="";
    foreach($crops_grown_last as $crop_grown){
      $crops.= $crop_grown . ",";
    }

    $live=$postjson['livestock'];
    $livestocked="";
    foreach($live as $y){
      $livestocked.= $y . ",";
    }
    
    $own_machinery=$postjson['own_any_farm_machinery'];
    $machinery="";
    foreach($own_machinery as $own){
      $machinery.= $own . ",";
    }

    $who=$postjson['Who_assisted_you'];
    $assisted="";
    foreach($who as $assist){
      $assisted.= $assist . ",";
    }
    
    $please=$postjson['Please_specify'];
    $specify="";
    foreach($please as $spec){
      $specify.= $spec . ",";
    }

    $challenge=$postjson['challenges_last_season'];
    $last_season="";
    foreach($challenge as $season){
      $last_season.= $season . ",";
    }

    $how=$postjson['How_do_you_keep_your_money'];
    $keep_money="";
    foreach($how as $your_money){
      $keep_money.= $your_money . ",";
    }

    $financial=$postjson['financial_transaction_challeng'];
    $transaction="";
    foreach($financial as $challeng){
      $transaction.= $challeng . ",";
    }
    
    $access_Agric=$postjson['How_do_you_access_Agric_ext_sv'];
    $access="";
    foreach($access_Agric as $ext){
      $access.= $ext . ",";
    }

    
    $extension=$postjson['extension_type_channel_receive'];
    $channel="";
    foreach($extension as $type){
      $channel.= $type . ",";
    }

    $adopt=$postjson['adopted_practices'];
    $practice="";
    foreach($adopt as $prac){
      $practice.= $prac . ",";
    }
    
    $train=$postjson['training'];
    $trained="";
    foreach($train as $training){
        $trained.= $training . ",";
    }

    $pesticide_info=$postjson['pest_fertilizer_pesticide_info'];
    $info="";
    foreach($pesticide_info as $pest){
        $info.= $pest . ",";
    }
    
    $weather_data=$postjson['access_to_weather_data'];
    $access="";
    foreach($weather_data as $x){
        $access.= $x . ",";
    }
    
    $main_use=$postjson['main_phone_use'];
    $phone_use="";
    foreach($main_use as $x){
        $phone_use.= $x . ",";
    }
    
    $service=$postjson['services_suscribed_to'];
    $subscribe="";
    foreach($service as $x){
        $subscribe.= $x . ",";
    }
    
    $prob=$postjson['probs_of_using_cellphone'];
    $probs_of_using="";
    foreach($prob as $x){
        $probs_of_using.= $x . ",";
    }

    //crops_for_new_season
    $for_new=$postjson['crops_for_new_season'];
    $new_season="";
    foreach($for_new as $x){
      $new_season.= $x . ",";
    }

//Concatenating the GPs of the location
$la1 = $postjson['la1'];
$lo1 =  $postjson['lo1'];
$_location = $la1.",".$lo1;
//Concatenating the Gps values for the main crop enterprise
$la2=$postjson['la2'];
$lo2=$postjson['lo2'];
$gps_main= $la2.",".$lo2;

    define('UPLOAD_DIR', 'upload/');
    $image_type1 = $postjson['Photo_url'];
    $image_base64 = base64_decode($image_type1);
    $file1 = UPLOAD_DIR . uniqid() . '.png';
    file_put_contents($file1, $image_base64);

    $image_type2 = $postjson['ID_photo_url'];
    $imagebase64 = base64_decode($image_type2);
    $file2 = UPLOAD_DIR . uniqid() . '.png';
    file_put_contents($file2, $imagebase64);

    $rs = $postjson['resident_since'];
    //$rsreal = STR_TO_DATE($rs,'%y-%m-%d');
   // $datetime = new DateTime();
    //$datetime1=toString($datetime);
    $date = new DateTime();
    $dateresult = $date->format('Y-m-d H:i:s');

    $insert = mysqli_query($mysqli, "INSERT INTO centetable SET
        SubmissionDate='$dateresult',
        start1='$postjson[consent]',
        end1='$postjson[consent]',
        username='$postjson[consent]',
        deviceid='$postjson[consent]',
        consent = '$postjson[consent]',/**done */
        farmers_name = '$postjson[farmers_name]',        
        What_is_your_gender='$postjson[What_is_your_gender]',
        any_disability = '$postjson[do_you_have_disability]',
        disability_type = '$postjson[disability_type]',
        own_a_mobile_phone = '$postjson[own_a_mobile_phone]',
        What_type_of_phone_do_you_own='$postjson[What_type_of_phone_do_you_own]',
        No_of_contacts ='$postjson[No_of_contacts]',
        tel_no1 = '$postjson[tel_no1]',
        tel_No_2='$postjson[tel_No_2]',
        service_provider='$postjson[service_provider]',
        Specify_svc_provider='$postjson[Specify_svc_provider]',
        mm_reg_status='$postjson[mm_reg_status]',
        registered_mm_number='$postjson[registered_mm_number]',
        nin= '$postjson[nin]',
        ID_photo_url='$file2',
        Photo_url='$file1',
        occupation='$postjson[occupation]',
        specify_other_occupation= '$postjson[specify_other_occupation]',
        Martial_status= '$postjson[Martial_status]',

        name_of_husband='$postjson[name_of_husband]',
        number_of_wives_husbands='$postjson[number_of_wives_husbands]',
        name_first_wife= '$postjson[name_first_wife]',
        name_second_wife='$postjson[name_second_wife]',

        status_in_a_family='$postjson[status_in_a_family]',/**not included in casa */
        
        next_of_kin='$postjson[next_of_kin]',
        next_of_kin_has_contact='$postjson[next_of_kin_has_contact]',
        next_of_kin_phone_no='$postjson[next_of_kin_phone_no]',
        region= '$postjson[region]',
        district='$postjson[distr]',
        other_district='$postjson[other_district]',
        subcounty='$postjson[subcounty]',
        other_subcounty='$postjson[other_subcounty]',
        subcounty_other_district='$postjson[subcounty_other_district]',
        soiltype='$postjson[soiltype]',
        parish='$postjson[parish]',
        village= '$postjson[village]',
        nearest_town='$postjson[nearest_town]',
        /**these columns in between are not included in casa start*/
        Local_council1_name='$postjson[Local_council1_name]',
        resident_since='$postjson[resident_since]',
        Description_of_location='$postjson[Description_of_location]',
        /**not included in casa end*/
        DOB='$postjson[DOB]',
        level_of_education='$postjson[level_of_education]',
        head_of_the_household='$postjson[head_of_the_household]',       
       /** _location=,some change has been applied on location ie to _location, i have also concatenated the latitude and longitude respectively*/
        Location_Latitude='$postjson[la1]',
        Location_Longitude='$postjson[lo1]',
        Location_Altitude='',/**to be worked on */
        Location_Accuracy='',/**to be worked on */
        Mobile_literacy='$postjson[Mobile_literacy]',
        any_dependants='$postjson[any_dependants]',
        dependant_no='$postjson[dependant_no]',
        dependants_age_bracket='$dependant',
        farmer_org= '$postjson[farmer_org]',
        name_of_farmer_org= '$postjson[name_of_farmer_org]',
        belong_farmergp='$postjson[belong_farmergp]',
        name_farmergp='$postjson[name_farmergp]',        
        year_services='$postjson[year_services]',
        position_in_FO='$postjson[position_in_FO]',
        Your_position_in_the_fo='$postjson[Your_position_in_the_fo]',
        male_members_in_FO= '$postjson[male_members_in_FO]',
        female_members_in_FO= '$postjson[female_members_in_FO]',
        Affiliation='$postjson[Affiliation]',
        Name_of_connected_ACE_or_DFA='$postjson[Name_of_connected_ACE_or_DFA]',/**not included in casa */
        main_income_source='$postjson[main_income_source]',
        mainincome_since='$postjson[mainincome_since]',
        sector='$postjson[sector]',
        main_income_relaibility= '$postjson[main_income_relaibility]',
        main_income_amount='$postjson[main_income_amount]',
        other_income_sources='$postjson[other_income_sources]',
        /** Loop through other income sources should appear in a separate table */
        other_income_activity='$postjson[other_income_activity]',
        years_of_experince='$postjson[years_of_experince]',
        other_income_reliability='$postjson[other_income_reliability]',
        amount='$postjson[amount]',
        /**end loop through other income source */
        annual_income='$postjson[annual_income]',
        income_trend='$postjson[income_trend]',
        access_to_Health_services='$postjson[access_to_Health_services]',
        health_expense='$postjson[health_expense]',
        school_going_children='$postjson[school_going_children]',
        no_of_school_going_children='$postjson[no_of_school_going_children]',
        school_fees_expense='$postjson[school_fees_expense]',
        /**added expenditure and disposable income*/
        expenditure='',/**to be worked on */
        disposable_income='', /**to be worked on */
        what_is_the_land_tenor='$postjson[what_is_the_land_tenor]',
        Specify_other='$postjson[Specify_other]',
        value_of_land='$postjson[value_of_land]',
        own_any_farm_machinery='$machinery',
        house_ownership='$postjson[house_ownership]',
        house_structure='$postjson[house_structure]',
        Farm_size='$postjson[Farm_size]',
        total_land_size='$postjson[total_land_size]',
        Main_crop_enterprise_='$postjson[Main_crop_enterprise]',
        Variety_of_mainenterprise='$postjson[Variety_of_mainenterprise]',
        Variety2_of_mainenterprise='$postjson[Variety2_of_mainenterprise]',/**to be worked on */
        landsize_main_crop_enterprise='$postjson[landsize_main_crop_enterprise]',
        additional_land_main_enterprise='$postjson[additional_land_main_enterprise]',
        season_of_planting='$postjson[season_of_planting]',
        yield_expected_main_enterprise= '$postjson[yield_expected_main_enterprise]',
        farm_at_residence='$postjson[farm_at_residence]',
        /**Gps main enterprise start */
        GPS_main_enterprise_Latitude='$postjson[la2]',
        GPS_main_enterprise_Longitude='$postjson[lo2]',
        GPS_main_enterprise_Altitude='',/**To be worked upon */
        GPS_main_enterprise_Accuracy='',/**To be worked upon */
        /**Gps main enterprise end */
        /**Getting the area and shape of the land */
        Record_area_primary='', /**to be worked on */
        shape_area_m2='', /**to be worked on */
        rounded_shape_area='', /**to be worked on */
        shape_area_acreage='',/**to be worked on */
        area_walked='',/**to be worked on */

        postharvest_mgt='$postjson[postharvest_mgt]',
        produce_storage='$postjson[produce_storage]',
        preservation='$postjson[preservation]',
        crops_for_new_season='$new_season',/** change made to ensure that the multiple select value fit in the column*/
        other_crops_intended='$postjson[other_crops_intended]',
        repeat_landsize_under_production_count='',/**To be worked on */
/**loop start to be put in another table */
        landsize_cropselected='$postjson[landsize_cropselected]',
        yield_per_acre ='$postjson[yield_per_acre]',
        in_business_since = '$postjson[in_business_since]',
/**loop ends */
/**Another loop start, another table is to be created for it*/
        farm_location='',/**stopped here */
/**Another loop end */

        number_of_employees='$postjson[number_of_employees]',
        livestock='$livestocked',
        specify_livestock='$postjson[specify_livestock]',
        cattle_number='$postjson[cattle_number]',
        goat_number='$postjson[goat_number]',
        sheep_number='$postjson[sheep_number]',
        chicken_number='$postjson[chicken_number]',
        pigs_number='$postjson[pigs_number]',
        donkey_number='$postjson[donkey_number]',
        Did_you_plant_last_season='$postjson[Did_you_plant_last_season]',
        crops_grown_last_season ='$crops',
        Specify_other_crops_grown='$postjson[Specify_other_crops_grown]',
        yield_of_maize_with_adequate_rain_per_acre='$postjson[yield_of_maize_with_adequate_rain_per_acre]',
        yield_of_beans_with_adequate_rain_per_acre='$postjson[yield_of_beans_with_adequate_rain_per_acre]',
        yield_of_sesame_with_adequate_rain_per_acre='$postjson[yield_of_sesame_with_adequate_rain_per_acre]',
        yield_of_soyabean_with_adequate_rain_per_acre='$postjson[yield_of_soyabean_with_adequate_rain_per_acre]',
        yield_of_rice_with_adequate_rain_per_acre='$postjson[yield_of_rice_with_adequate_rain_per_acre]',
        yield_of_millet_with_adequate_rain_per_acre='$postjson[yield_of_millet_with_adequate_rain_per_acre]',
        yield_of_sorghum_with_adequate_rain_per_acre='$postjson[yield_of_sorghum_with_adequate_rain_per_acre]',
        yield_of_irish_potatoes_with_adequate_rain_per_acre='$postjson[yield_of_irish_potatoes_with_adequate_rain_per_acre]',
        yield_of_cotton_with_adequate_rain_per_acre='$postjson[yield_of_cotton_with_adequate_rain_per_acre]',
        yield_of_sweet_potatoes_with_adequate_rain_per_acre='$postjson[yield_of_sweet_potatoes_with_adequate_rain_per_acre]',  
        yield_of_sunflower_with_adequate_rain_per_acre='$postjson[yield_of_sunflower_with_adequate_rain_per_acre]',
        yield_of_ground_nuts_with_adequate_rain_per_acre='$postjson[yield_of_groundnuts_with_adequate_rain_per_acre]',
        yield_of_coffee_with_adequate_rain_per_acre='$postjson[yield_of_coffee_with_adequate_rain_per_acre]',
        yield_of_banana_with_adequate_rain_per_acre='$postjson[yield_of_banana_with_adequate_rain_per_acre]',
        yield_of_cassava_with_adequate_rain_per_acre='$postjson[yield_of_cassava_with_adequate_rain_per_acre]',
        crops_stored_from_last_season='$postjson[crops_stored_from_last_season]',
        storage_time='$postjson[storage_time]',
        disturbances_in_storage='$postjson[disturbances_in_storage]',
        Specify_others='$postjson[Specify_others]',
        maize_per_kg='$postjson[maize_per_kg]',
        beans_per_kg='$postjson[beans_per_kg]',
        sesame_per_kg='$postjson[sesame_per_kg]',
        soyabean_per_kg='$postjson[soyabean_per_kg]',
        rice_per_kg= '$postjson[rice_per_kg]',
        millet_per_kg='$postjson[millet_per_kg]',
        sorghum_per_kg= '$postjson[sorghum_per_kg]',
        irish_potatoes_per_kg='$postjson[irish_potatoes_per_kg]',
        cotton_per_kg='$postjson[cotton_per_kg]',
        sweet_potatoes_per_kg='$postjson[sweet_potatoes_per_kg]',
        sunflower_per_kg= '$postjson[sunflower_per_kg]',
        ground_nuts_per_kg='$postjson[ground_nuts_per_kg]',
        coffee_per_kg= '$postjson[coffee_per_kg]',
        Banana_per_bunch='$postjson[Banana_per_bunch]',
        cassava_per_kg= '$postjson[cassava_per_kg]',
        Did_you_apply_fertilizer= '$postjson[Did_you_apply_fertilizer]',
        Specify_the_type= '$postjson[Specify_the_type]',
        organic_specify= '$postjson[organic_specify]',
        Specify_other_organic= '$postjson[Specify_other_organic]',
        inorganic_Specify='$inorgan',
        use_pesticides_or_herbicides= '$postjson[use_pesticides_or_herbicides]',
        Please_specify_which_one= '$postjson[Please_specify_which_one]',
        pesticide_effectiveness= '$postjson[pesticide_effectiveness]',
        crop_use= '$postjson[crop_use]',
        involved_in_marketing='$postjson[involved_in_marketing]',
        sell_of_produce_Nyakyera='$postjson[sell_of_produce_Nyakyera]',
        sell_of_produce_green='$postjson[sell_of_produce_green]',
        sell_of_produce_equator='$postjson[sell_of_produce_equator]',
        sell_of_produce_liraresort='$postjson[sell_of_produce_liraresort]',
        sell_of_produce_cedo='$postjson[sell_of_produce_cedo]',
        sell_of_produce_orum='$postjson[sell_of_produce_orum]',
        Marketlink='$postjson[Marketlink]',
        agent_name='$postjson[agent_name]',
        produce_transport='$postjson[produce_transport]',
        employ_any_farm_labour='$postjson[employ_any_farm_labour]',
        Specify_their_task='$task',
        Who_assisted_you='$assisted',
        How_much_did_you_pay_them='$postjson[How_much_did_you_pay_them]',
        Are_you_aware_of_climate_shock='$postjson[Are_you_aware_of_climate_shock]',
        which_ones_you_are_aware_of='$postjson[which_ones_you_are_aware_of]',
        training_on_addressing_climate='$postjson[training_on_addressing_climate]',
        Please_specify='$specify',
        Which_crops_for_rotation='$postjson[Which_crops_for_rotation]',
        knoledge_of_rain_date='$postjson[knoledge_of_rain_date]',
        heard_of_agri_insurance='$postjson[heard_of_agri_insurance]',
        access_to_agri_insurance='$postjson[access_to_agri_insurance]',
        Please_specify_the_agri_insurance_type='$postjson[Please_specify_the_agri_insurance_type]',
        Specify_the_insurance_provider='$postjson[Specify_the_insurance_provider]',
        fair_charge_for_insurance='$postjson[fair_charge_for_insurance]',
        prefer_ordinary_or_az_bunlde='$postjson[prefer_ordinary_or_az_bunlde]',
        challenges_last_season='$last_season',
        Specify='$postjson[Specify]',
        What_type_of_pests='$postjson[What_type_of_pests]',
        type_of_weather_and_effect='$postjson[type_of_weather_and_effect]',
        Do_you_have_a_bank_account='$postjson[Do_you_have_a_bank_account]',
        financial_access='$postjson[financial_access]',
        transaction_monthly_costs='$postjson[transaction_monthly_costs]',
        Specify_other_monthly_transaction_costs='$postjson[Specify_other_monthly_transaction_costs]',
        travel_distance='$postjson[travel_distance]',
        specify_other_travel_distance='$postjson[specify_other_travel_distance]',
        Have_you_ever_received_credit='$postjson[Have_you_ever_received_credit]',
        no_of_times_borrowed='$postjson[no_of_times_borrowed]',
        loanoutstanding='$postjson[loanoutstanding]',
        How_much_repayment_was_made_per_month='$postjson[How_much_repayment_was_made_per_month]',
        delay_time_for_repayment='$postjson[delay_time_for_repayment]',
        How_do_you_keep_your_money='$keep_money',
        financial_transaction_challeng='$transaction',
        Specify_Other_financial_transaction_challeng='$postjson[Specify_Other_financial_transaction_challeng]',
        action_access_to_financial_svc='$postjson[action_access_to_financial_svc]',
        access_to_agric_ext_services='$postjson[access_to_agric_ext_services]',
        How_do_you_access_Agric_ext_sv='$access',
        extension_type_channel_receive='$channel',
        adopted_practices ='$practice',
        most_mostadoptedpractice='$postjson[most_mostadoptedpractice]',
        Rate_services_training='$postjson[Rate_services_training]',
        frequently_access_ext_svcs='$postjson[frequently_access_ext_svcs]',
        is_information_provided_accurt='$postjson[is_information_provided_accurt]',
        trainingappropriate='$postjson[trainingappropriate]',
        benefits_of_practices='$postjson[benefits_of_practices]',
        pay_anything_to_access_ext_svc='$postjson[pay_anything_to_access_ext_svc]',
        training ='$trained',
        pay_per_season='$postjson[pay_per_season]',
        pest_fertilizer_pesticide_info='$info',
        Do_you_receive_weather_data='$postjson[Do_you_receive_weather_data]',
        access_to_weather_data='$access',
        How_accurate_is_the_info='$postjson[How_accurate_is_the_info]',
        most_harmful_info='$postjson[most_harmful_info]',
        biggest_prob_in_data_access='$postjson[biggest_prob_in_data_access]',
        spend_on_your_phone_monthly='$postjson[spend_on_your_phone_monthly]',
        main_phone_use='$phone_use',
        subscribed_to_info_svces_on_ph='$postjson[subscribed_to_info_svces_on_ph]',
        services_suscribed_to='$subscribe',
        training_on_using_phone_servic='$postjson[training_on_using_phone_servic]',
        training_on_weather_alerts='$postjson[training_on_weather_alerts]',
        Who_provided_the_training_on_weather_alerts='$postjson[Who_provided_the_training_on_weather_alerts]',
        trainig_on_insurance='$postjson[trainig_on_insurance]',
        Who_provided_the_training_on_insurance='$postjson[Who_provided_the_training_on_insurance]',
        probs_of_using_cellphone='$probs_of_using',
        field_officer='$postjson[field_officer]',
        hhplanting_decision='$postjson[hhplanting_decision]',
        hhproductionphase_decision='$postjson[hhproductionphase_decision]',
        hhpostharvet_decision='$postjson[hhpostharvet_decision]',
        hhmarketing_decision='$postjson[hhmarketing_decision]',
        hhincome_decision='$postjson[hhincome_decision]',
        meals_a_day='$postjson[meals_a_day]',
        Vegetables='$postjson[Vegetables]',
        Carbohydrates='$postjson[Carbohydrates]',
        fruits='$postjson[fruits]',
        proteins='$postjson[proteins]',
        farmers_cooperation_responding='$postjson[farmers_cooperation_responding]',
        how_well_agent_knows_beneficiary='$postjson[how_well_agent_knows_beneficiary]',
        accuracy_of_info_collected='$postjson[accuracy_of_info_collected]',
        data_quality='$postjson[data_quality]'
");
if($insert){ 
  $result= json_encode(array('success'=>true, 'msg'=>'Submission successful'));
}else{

	//if (!mysqli_query($mysqli,$insert)) {
		//printf("Error: %s\n", mysqli_error($conn));	  
    $result = json_encode(array('success'=>false, 'msg'=>'Submission failed '.mysqli_error($mysqli).''));
	//}
  //$result = json_encode(array('success'=>false, 'msg'=>'Submission failed'));
}

echo $result;
}


//`id` int(13) DEFAULT NULL
//ALTER TABLE `centetable`
//  MODIFY `id` int(13) DEFAULT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;
//COMMIT;