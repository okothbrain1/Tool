<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: appication/json');

$data = ['result' => false];
$target_path = time().'.jpg';

if(isset($_POST['file'])){
    $imagedata = $_POST['file'];
    $imagedata = str_replace('data:image/jpeg;base64,','',$imagedata);
    $imagedata = str_replace('data:image/jpg;base64,','',$imagedata);
    $imagedata = str_replace(' ','+',$imagedata);

    file_put_conents($target_path, $imagedata);

    $data['result']=true;
    $data['image_url']='https://3.12.97.246/ican/upload/media/';
}
echo json_encode($data);
// if you want to find the root path of a folder use the line of code below:
//echo $_SERVER['DOCUMENT_ROOT']


/*if ($_FILES["file"]["error"] > 0){
    echo "Error Code: " . $_FILES["file"]["error"] . "<br />";
    }
    else
    {
    echo "Uploaded file: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kilobytes<br />";
    
    if (file_exists("/files/".$_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. No joke-- this error is almost <i><b>impossible</b></i> to get. Try again, I bet 1 million dollars it won't ever happen again.";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],"/var/www/vhosts/yourdomain.com/subdomains/domainname/httpdocs/foldername/images/".$_FILES["file"]["name"]);
      echo "Done";
      }
    }*/
?>


