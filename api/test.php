<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASSWORD','password');
define('DB_NAME','ican');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$sql = "SELECT capture_meeting_image, meta_instanceID FROM dataset_mobile";
$result = mysqli_query($mysqli,$sql);
while($row = mysqli_fetch_assoc($result)){    
$mi = $row['meta_instanceID'];

    define('UPLOAD_DIR', 'upload/');
    $image_type = $row['capture_meeting_image'];
    $image_base64 = base64_decode($image_type);
    $file = UPLOAD_DIR . uniqid() . '.png';
    file_put_contents($file, $image_base64);

    echo $file .'-'. $mi .'</br>.';
}
$se = "UPDATE dataset_mobile SET Photo_url='$file' WHERE meta_instance_ID = '$mi'";
$result = mysqli_query($mysqli,$se);
   
