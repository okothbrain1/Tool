<?php
/*$name = $_POST['name'];
if($_FILES['file']){
    $path = 'uploads/';
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
    $originalName = $_FILES['file']['name'];
    $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
    $t=time();
    $generatedName = md5($t.$originalName).$ext;
    $filePath = $path.$generatedName;
    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        echo json_encode(array(
            'result' => 'success',
'status' => true,
));
}
} */

header('Access-Control-Allow-Origin: *');




$target_path = "upload/";

$target_path = $target_path.basename ($_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
    echo "upload successful";
}else{
    echo $target_path;
}
?>