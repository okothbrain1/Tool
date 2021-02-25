<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASSWORD','password');
define('DB_NAME','ican');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$postjson = json_decode(file_get_contents('php://input'), true);

$today = date('Y-m-d H:i:s');

if($postjson['aski']=="submit"){
       
    $insert = mysqli_query($mysqli, "INSERT INTO agent_mobile SET
    submission_Date = '$today'
    region = '$postjson[country]',
    district = '$postjson[state]',
    subcounty = '$postjson[subcounty]',
    field_officer = '$postjson[name]',
    bsps = '$postjson[bsps]',
    vslas = '$postjson[vslas]',
    miycan = '$postjson[miycan]',
    vhts = '$postjson[vhts]',
    ddmcs = '$postjson[ddmcs]',
    cstructures = '$postjson[cstructures]',
    champions = '$postjson[champions]',
    schools = '$postjson[schools]',
    radio_stations = '$postjson[radiostations]'
    ");
    if($insert){ 
        $result= json_encode(array('success'=>true, 'msg'=>'Submission successful'));
    }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Submission failed'));
    }

    echo $result;
}