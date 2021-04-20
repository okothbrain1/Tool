<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','centedb');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$postjson = json_decode(file_get_contents('php://input'), true);
date_default_timezone_set('Africa/Nairobi');

$today = date('Y-m-d H:i:s');
$null = 'null';

if($postjson['aski']=="submit"){

    //$encoded = "encoded---text---here===";
    //$file = fopen("mypicture.png", "w"); //(you can put jpg, png or any other extension)
    //fwrite($file, base64_decode($encoded));
    //fclose($file); 

    define('UPLOAD_DIR', 'upload/');
    $image_type = $postjson['Photo_url'];
    $image_base64 = base64_decode($image_type);
    $file = UPLOAD_DIR . uniqid() . '.png';
    file_put_contents($file, $image_base64);
  
    $insert = mysqli_query($mysqli, "INSERT INTO dataset_mobile SET
    submission_Date = '$today',
    region = '$postjson[region]',
    district = '$postjson[district]',
    subcounty = '$postjson[subcounty]',
    topic = '$postjson[topic]',
    activity = '$postjson[activity]',
    capture_meeting_image = '$file',
    male_member_attendance = '$postjson[males]',
    female_member_attendance = '$postjson[females]',
    total_attendance = '$postjson[total]',
    meeting_latitude = '$postjson[la]',
    meeting_longitude = '$postjson[lo]',
    submitter_name = '$postjson[fo]'
    ");
    if($insert){ 
        $result= json_encode(array('success'=>true, 'msg'=>'Submission successful'));
    }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Submission failed'));
    }

    echo $result;
}