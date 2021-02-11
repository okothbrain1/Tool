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

header ('Access-Control-Allow-Origin');
header(content-type: application/json);

echo json_encode($data)


?>