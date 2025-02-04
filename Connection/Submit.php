<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request (OPTIONS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Database configuration (same as recive.php)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "filmstoredb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);


// Validate input
if (!isset($data["name"], $data["price"], $data["category"], $data["URL"])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit();
}

$name = $conn->real_escape_string($data["name"]);
$price = $conn->real_escape_string($data["price"]);
$category = $conn->real_escape_string($data["category"]);
$URL = $conn->real_escape_string($data["URL"]);


// Insert data into database
$sql = "INSERT INTO filmlisttb (name, price, category, URL) VALUES ('$name', '$price', '$category', '$URL')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Data saved successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

// Close connection
$conn->close();
?>