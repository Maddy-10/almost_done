<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$HOST = "localhost";
$USER = "root";
$PASSWORD = "";
$DB = "projectDB";

$db_conn = mysqli_connect($HOST, $USER, $PASSWORD, $DB);
if ($db_conn == false) {
    die("ERROR CONNECTION : ");
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
case "POST":
 $username=$_POST['username'];
 $email=$_POST['email'];
 $password=$_POST['password'];
 
 $result = mysqli_query($db_conn,"INSERT INTO users (username,email,password) VALUES ('$susername','$email',$password)");
 
 if($result){
 echo json_encode(["SUCCESS"=>"USER ADDED"]);
 return;
}
else{
echo json_encode(["FAILED"=>"USER ADDING FAILED"]);
 return;
}
break;
}
?>
