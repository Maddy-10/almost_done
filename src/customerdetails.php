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
        $allcustomer = mysqli_query($db_conn, "SELECT * FROM customers"); 
        if(mysqli_num_rows($allcustomer) > 0) {
            while($row = mysqli_fetch_array($allcustomer)) {
                $json_array["customerdata"][] = array(
                    "cid" => $row['uid'], 
                    "customername" => $row["customername"], 
                    "mobile" => $row["mobile"], 
                    "alterMobile" => $row["alterMobile"],
                    "address" => $row["cus_address"], // corrected column name
                    "city" => $row["city"],
                    "pincode" => $row["pincode"],
                    "landmark" => $row["landmark"]
                );
            }
            echo json_encode($json_array["customerdata"]);
            return;
        } else {
            echo json_encode(["result" => "Please check the Data"]); 
            return;
        }
        break;
    
    case "POST":
        $customerData = json_decode(file_get_contents("php://input"));
        $customername = $customerData->customername;
        $mobile = $customerData->mobile;
        $alterMobile = $customerData->alterMobile;
        $address = $customerData->address;
        $city = $customerData->city;
        $pincode = $customerData->pincode;
        $landmark = $customerData->landmark;
        
        // Removed backticks around values and corrected column names
        $result = mysqli_query($db_conn, "INSERT INTO customers (customername, mobile, alterMobile, cus_address, city, pincode, landmark) VALUES ('$customername', '$mobile', '$alterMobile', '$address', '$city', '$pincode', '$landmark')");
        
        if ($result) {
            echo json_encode(["Success" => "Customer Details Added Success"]);
            return;
        } else {
            echo json_encode(["Failed" => "Failed to add Customer Details"]);
            return;
        }
        break;
}
?>
