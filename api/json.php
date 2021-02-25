<?php 

$data = ['result'=>false];
$target_path = time().'.jpg';

if(isset($_POST['file'])){
    $imagedata = $_POST['file'];
    $imagedata = str_replace('data:image/jpeg;base64,', '', $imagedata);
    $imagedata = str_replace('data:image/jpg;base64,', '', $imagedata);
    $imagedata = str_replace('', '+', $imagedata);
    $imagedata = base64_decode($imagedata);

    file_put_contents($target_path, $imagedata);

    $data['result'] = true;
    $data['image_url'] = 'our host'.$target_path;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Request-Width, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

echo json_encode($data)


?>