<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

date_default_timezone_set('Africa/Nairobi');

$today = date('Y-m-d H:i:s');

if($postjson['aski']=="proses_register"){

$chkmail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email FROM login WHERE email = '$postjson[email]'"));
        if($chkmail['email']==$postjson['email']){
            $result = json_encode(array('success'=>false, 'msg'=> 'Email already exists'));
        }else{

    $password = md5($postjson['password']);

    $insert = mysqli_query($mysqli, "INSERT INTO login SET
    email = '$postjson[email]',
    name = '$postjson[name]',
    gender = '$postjson[gender]',
    dob = '$postjson[dob]',
    phone = '$postjson[phone]',
    password = '$password',
    created_at = '$today'
    ");
    if($insert){ 
        $result= json_encode(array('success'=>true, 'msg'=>'Registration successful'));
    }else{
        $result = json_encode(array('success'=>false, 'msg'=>'registration failed'));
    }
}
    echo $result;
}else if($postjson['aski']=="process_register"){

    $chkmail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email FROM login WHERE email = '$postjson[email]'"));
            if($chkmail['email']==$postjson['email']){
                $result = json_encode(array('success'=>false, 'msg'=> 'Email already exists'));
            }else{
    
        $password = md5($postjson['password']);
    
        $insert = mysqli_query($mysqli, "INSERT INTO login SET
        email = '$postjson[email]',
        name = '$postjson[name]',
        gender = '$postjson[gender]',
        dob = '$postjson[dob]',
        phone = '$postjson[phone]',
        password = '$password',
        created_at = '$today'
        
        ");
        if($insert){ 
            $result= json_encode(array('success'=>true, 'msg'=>'Registration successful'));
        }else{
            $result = json_encode(array('success'=>false, 'msg'=>'Registration failed'.mysqli_error()));
        }
    }
        echo $result;
    }
    elseif ($postjson['aski']=="process_login"){

        $password = md5($postjson['password']);
        $loginData = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM login WHERE email = '$postjson[email]' AND password = '$password'"));       
     
            $data = array(
            'muser_id'  => $loginData['muser_id'],
            'email'     => $loginData['email'],
            'name'      => $loginData['name'],
            'gender'    => $loginData['gender'],
            'dob'       => $loginData['dob'],
            'phone'     => $loginData['phone']

            );
            if($loginData){ 
                $result= json_encode(array('success'=>true, 'result'=>$data));
            }else{
                $result = json_encode(array('success'=>false));
            }
         echo $result;
        }

//Performing an update on the database table cpt
elseif($postjson['aski']=="update"){
    $crops_grown_last=$postjson['crops_grown_last_season'];
    $crops="";
    $crops_count=0;
    foreach($crops_grown_last as $crop_grown){
      $crops.= $crop_grown . ",";
      $crops_count +=1;
    }
    $commercial=$postjson['crop_commercial'];
    $commercial_volume="";
    $count_comm=0;
    foreach($commercial as $x){
      $commercial_volume.= $x . ",";
      $count_comm += 1;
    }

  $seed=$postjson['how_much_seed'];
  $much="";
  foreach($seed as $x){
    $much.= $x . ",";
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

    $id = $postjson['id'];
    $update = mysqli_query($mysqli, "UPDATE cptupdated SET 
            farmers_name = '$postjson[farmers_name]',
            What_is_your_gender='$postjson[What_is_your_gender]',
            any_disability = '$postjson[do_you_have_disability]',
            disability_type = '$postjson[disability_type]',
            tel_no1 = '$postjson[tel_no1]',
            nin= '$postjson[nin]',
            farmer_org= '$postjson[farmer_org]',
            name_of_farmer_org= '$postjson[name_of_farmer_org]',
            year_services='$postjson[year_services]',
            Main_crop_enterprise='$postjson[Main_crop_enterprise]',
            Variety_of_mainenterprise='$postjson[Variety_of_mainenterprise]',
            Variety2_of_mainenterprise='$postjson[Variety2_of_mainenterprise]',
            landsize_main_crop_enterprise='$postjson[landsize_main_crop_enterprise]',
            season_of_planting='$postjson[season_of_planting]',
            crops_grown_last_season='$crops',
            how_much_seed='$much',
            repeat_crop_volume_commercial_count='$count_comm', /**Begin repeat */
            /**Crops commercial */
            item_post7='$crops',
            item_name7='$crops',
            crop_volumec ='$commercial_volume',
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
            access_to_agric_ext_services='$postjson[access_to_agric_ext_services]',
            extension_type_channel_receive='$channel',
            adopted_practices ='$practice',
            most_mostadoptedpractice='$postjson[most_mostadoptedpractice]',
            Rate_services_training='$postjson[Rate_services_training]',
            frequently_access_ext_svcs='$postjson[frequently_access_ext_svcs]',
            benefits_of_practices='$postjson[benefits_of_practices]',
            pay_anything_to_access_ext_svc='$postjson[pay_anything_to_access_ext_svc]',
            How_accurate_is_the_info='$postjson[How_accurate_is_the_info]',
            gender_equality_hhplanting_decision='$postjson[hhplanting_decision]',
            gender_equality_hhproductionphase_decision='$postjson[hhproductionphase_decision]',
            gender_equality_hhpostharvet_decision='$postjson[hhpostharvet_decision]',
            gender_equality_hhmarketing_decision='$postjson[hhmarketing_decision]',
            gender_equality_hhincome_decision='$postjson[hhincome_decision]',
            Nutrition_meals_a_day='$postjson[meals_a_day]',
            Nutrition_Vegetables='$postjson[Vegetables]',
            Nutrition_Carbohydrates='$postjson[Carbohydrates]',
            Nutrition_fruits='$postjson[fruits]',
            Nutrition_proteins='$postjson[proteins]',
            SubmitterName ='$postjson[field_officer]'
    WHERE meta_instanceID='$id' ");
    
    if($update){ 
      $result= json_encode(array('success'=>true, 'msg'=>'You have successfully Updated the Farmer details, Proceed to another farmer'));
    }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Update FAILED'.mysqli_error($mysqli).''));     
    }
    
    echo $result;
    }

/* Counting the total number of submissions for each user*/
elseif($postjson['aski']=="checkNumbers"){
$sqli = "SELECT COUNT(SubmitterName) AS total FROM cpt WHERE SubmitterName= '$postjson[field_officer]'";
$res = mysqli_query($mysqli, $sqli);
$values = mysqli_fetch_assoc($res);
$number_rows = $values['total'];
//echo $number_rows;
if($res){ 
    $result= json_encode(array('success'=>true, 'result'=>$number_rows));
}else{
    $result = json_encode(array('success'=>false));
}
echo $result;
}   