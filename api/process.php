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
            $result = json_encode(array('success'=>false, 'msg'=>'Registration failed'));
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
            'phone'     => $loginData['phone'],

            );
            if($loginData){ 
                $result= json_encode(array('success'=>true, 'result'=>$data));
            }else{
                $result = json_encode(array('success'=>false));
            }
         echo $result;
        }