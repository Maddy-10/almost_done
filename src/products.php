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

switch ($method) {
    case "GET":
            $path=explode('/',$_SERVER['REQUEST_URI']);
            if(isset($path[4])&& is_numeric($path[4])){
                echo "GET API SINGLE ROW"; die;
            }
            else{
                //echo "RETURN ALL DATA"; die;
                $destination = $_SERVER['DOCUMENT_ROOT']."/api"."/";
                $all_product = mysqli_query($db_conn,"SELECT * FROM products");
                if(mysqli_num_rows($all_product)>0){
                    while($row = mysqli_fetch_array($all_product)){
                        $json_array["productData"][] = array("p_id" => $row['p_id'], "p_name" => $row['p_name'], "p_price" => $row['p_price'], "p_stock" => $row['p_stock'], "p_descrip" => $row['p_descrip'], "p_img" => $row['p_img']);
                    }
                    echo json_encode($json_array);
                    return;
                }
                else{
                    echo json_encode(["Result" => "Please Check The Data"]);
                    return;
                }
            }

        break;
    case "POST":
        if (isset($_FILES['p_img'])) {
            $p_name = $_POST['p_name'];
            $p_price = $_POST['p_price'];
            $p_stock = $_POST['p_stock'];
            $p_descrip = $_POST['p_descrip'];
            $p_img = $_FILES['p_img']['name'];
            $p_img_temp = $_FILES['p_img']['tmp_name']; // Corrected variable name
            $destination = $_SERVER['DOCUMENT_ROOT'] . '/api/images' . "/" . $p_img;

            $result = mysqli_query($db_conn, "INSERT INTO products (p_name, p_price, p_stock, p_descrip, p_img) VALUES ('$p_name','$p_price','$p_stock','$p_descrip','$p_img')");

            if ($result) {
                move_uploaded_file($p_img_temp, $destination);
                echo json_encode(["SUCCESS" => "UPLOAD COMPLETE"]);
                return;
            } else {
                echo json_encode(["FAILED" => "UPLOAD INCOMPLETE"]);
                return;
            }
        } else {
            echo json_encode(["FAILED" => "DATA NOT IN CORRECT FORMAT"]);
            return;
        }
        break;

case "DELETE":
$path=explode('/',$_SERVER["REQUEST_URI"]);
$result=mysqli_query($db_conn,"DELETE FROM products WHERE p_id='$path[4]'");
if($result){
echo json_encode(["Success"]);
return;
}
else{
echo json_encode(["Fail"]);
return;
}
break;
}
?>
