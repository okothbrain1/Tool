<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

define('DB_HOST','3.12.97.246');
define('DB_USER','collect');
define('DB_PASSWORD','password');
define('DB_NAME','centedb');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if(!$mysqli){
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";