<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "filmstoredb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);


if (!isset($data["name"], $data["price"], $data["category"], $data["URL"])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit();
}

$name = $conn->real_escape_string($data["name"]);
$price = $conn->real_escape_string($data["price"]);
$category = $conn->real_escape_string($data["category"]);
$URL = $conn->real_escape_string($data["URL"]);


$sql = "INSERT INTO filmlisttb (name, price, category, URL) VALUES ('$name', '$price', '$category', '$URL')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Data saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

$conn->close();
?>