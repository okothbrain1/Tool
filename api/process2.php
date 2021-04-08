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
date_default_timezone_set('Africa/Nairobi');

$today = date('Y-m-d H:i:s');
$null = 'Null';
$completed = 'Yes';

if($postjson['aski']=="submit"){


    define('UPLOAD_DIR', 'upload/');
    $image_type = $postjson['Photo_url'];
    $image_base64 = base64_decode($image_type);
    $file = UPLOAD_DIR . uniqid() . '.png';
    file_put_contents($file, $image_base64);
  
    $topic = $postjson['topic'];
    $activity = $postjson['activity'];
    $field_officer= $postjson['fo'];
    $total = $postjson['males'] + $postjson['females'];
    
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
    total_attendance = $total,
    meeting_latitude = '$postjson[la]',
    meeting_longitude = '$postjson[lo]',
    submitter_name = '$postjson[fo]'
    ");
    if($insert){ 
       
        $sql = "SELECT topic, activity, field_officer FROM schedule WHERE topic = ? AND activity = ? AND field_officer = ?";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
           echo 'sql error1';
        } else {
            mysqli_stmt_bind_param($stmt, "sss", $topic, $activity, $field_officer);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultcheck = mysqli_stmt_num_rows($stmt);
            if ($resultcheck > 0) {
                $sql = "UPDATE schedule SET completed = ? WHERE topic='$topic' AND activity='$activity' AND field_officer='$field_officer'";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo 'sql error2';  
        } else {
            mysqli_stmt_bind_param($stmt, "s", $completed);
            mysqli_stmt_execute($stmt);
            /*success message*/  
            $result= json_encode(array('success'=>true, 'msg'=>'Submission successful'));
        }
            } endif;
       
}
    }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Submission failed'));
    }

    echo $result;
}