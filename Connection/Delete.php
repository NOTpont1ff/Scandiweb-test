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

if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "Invalid data format"]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM filmlisttb WHERE ID = ?");
$stmt->bind_param("i", $filmId);

$deletedFilms = [];
$errors = [];

foreach ($data as $filmId) {
    if ($stmt->execute()) {
        $deletedFilms[] = $filmId;
    } else {
        $errors[] = ["id" => $filmId, "error" => $stmt->error];
    }
}

if (count($errors) === 0) {
    echo json_encode(["success" => true, "message" => "Films deleted successfully", "deleted" => $deletedFilms]);
} else {
    echo json_encode(["success" => false, "message" => "Some films could not be deleted", "errors" => $errors]);
}

$stmt->close();
$conn->close();
?>