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
    die("ERROR CONNECTION: " . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case "GET":

    $alluser= mysqli_query($db_conn, "SELECT * FROM users"); 
    if(mysqli_num_rows($alluser) > 0)
    {
      while($row= mysqli_fetch_array($alluser))
      {
       $json_array["userdata"][]= array("uid"=>$row['uid'], "username"=>$row["username"], "email"=>$row["email"], "password"=>$row["password"]);
      }
      echo json_encode($json_array["userdata"]);
      return;
    } else {
        echo json_encode(["result"=>"Please check the Data"]); 
        return;
    }
  
	break;
    case "POST":
        $userData = json_decode(file_get_contents("php://input"));
        $username = $userData->username;
        $email = $userData->email;
        $password = $userData->password;
        
        $result = mysqli_query($db_conn, "INSERT INTO users (username,email,password) VALUES ('$username','$email','$password')");
        
        if ($result) {
            echo json_encode(["Success" => "Register Success"]);
            return;
        } else {
            echo json_encode(["Failed" => "Register Failed"]);
            return;
        }
        
        break;
}
?>

