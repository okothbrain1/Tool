<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

define('DB_HOST','3.12.97.246');
define('DB_USER','collect');
define('DB_PASSWORD','password');
define('DB_NAME','ican');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$postjson = json_decode(file_get_contents('php://input'), true);

$today = date('Y-m-d H:i:s');
$null = 'null';

if($postjson['aski']=="submit"){

    define('UPLOAD_DIR', 'upload/');
    //$image_parts = explode(";base64,", $_POST['image']);
    //$image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $postjson['Photo_Url'];
    //$image_type = $image_type_aux[1];
    ///$image_base64 = base64_decode($image_parts[1]);
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
    capture_meeting_image = '$postjson[Photo_url]',
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