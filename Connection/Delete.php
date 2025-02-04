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
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["ID"])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit();
}

$filmID = $conn->real_escape_string($data["ID"]);

$sql = "DELETE FROM filmlisttb WHERE ID = '$filmID'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Film deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error deleting film: " . $conn->error]);
}

$conn->close();
?>