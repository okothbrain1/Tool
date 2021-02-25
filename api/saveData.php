<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

/*
* Database Constants
* Make sure you are putting the values according to your database here
*/
define('DB_HOST','localhost');
define('DB_USERNAME','root');
define('DB_PASSWORD','');
define('DB_NAME', 'android');
//Connecting to the database
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
//checking the successful connection
if($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
//making an array to store the response
$response = array();
//if there is a post request move ahead
if($_SERVER['REQUEST_METHOD']=='POST'){
//getting the name from request
$region= $_POST['name'];
$district = $_POST['name'];
$subcounty = $_POST['name'];
$topic = $_POST['name'];
$activity = $_POST['name'];
$Photo_url = $_POST['name'];
$n0_males = $_POST['name'];
$no_females = $_POST['name'];
$total_attendance = $_POST['name'];
$longitude = $_POST['name'];
$latitude = $_POST['name'];
$field_officer = $_POST['name'];
//creating a statement to insert to database
$stmt = $conn->prepare("INSERT INTO names (name) VALUES (?)");
//binding the parameter to statement
$stmt->bind_param("s", $name);
//if data inserts successfully
if($stmt->execute()){
//making success response
$response['error'] = false;
$response['message'] = 'Name saved successfully';
}else{
//if not making failure response
$response['error'] = true;
$response['message'] = 'Please try later';

}
}else{
$response['error'] = true;
$response['message'] = "Invalid request";
}
//displaying the data in json format
echo json_encode($response);