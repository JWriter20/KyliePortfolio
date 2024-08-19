<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$database = $_ENV['DB_DATABASE'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];

$pdo = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4", $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 1. Read portfolio details
function getPortfolioDetails() {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM portfolio_details");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($results);
}

// 2. Add a new portfolio entry
function addPortfolioDetail() {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $pdo->prepare("INSERT INTO portfolio_details (title, price, type, isFramed, width, height, weight, details, imageUrls) 
                           VALUES (:title, :price, :type, :isFramed, :width, :height, :weight, :details, :imageUrls)");
    $stmt->execute([
        ':title' => $data['title'],
        ':price' => $data['price'],
        ':type' => $data['type'],
        ':isFramed' => $data['isFramed'],
        ':width' => $data['width'],
        ':height' => $data['height'],
        ':weight' => $data['weight'],
        ':details' => $data['details'],
        ':imageUrls' => json_encode($data['imageUrls']),
    ]);

    header('Content-Type: application/json');
    echo json_encode(['message' => 'Portfolio detail added successfully']);
}

// 3. Delete a portfolio entry
function deletePortfolioDetail($id) {
    global $pdo;

    $stmt = $pdo->prepare("DELETE FROM portfolio_details WHERE id = :id");
    $stmt->execute([':id' => $id]);

    header('Content-Type: application/json');
    echo json_encode(['message' => 'Portfolio detail deleted successfully']);
}

// 4. Upload image and return URL
function uploadImage() {
    if (isset($_FILES['image'])) {
        $uploadDir = __DIR__ . '/public_html/';
        $uploadFile = $uploadDir . basename($_FILES['image']['name']);
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            $url = 'https://yourdomain.com/public_html/' . basename($_FILES['image']['name']);
            header('Content-Type: application/json');
            echo json_encode(['url' => $url]);
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['message' => 'Failed to upload image']);
        }
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['message' => 'No image provided']);
    }
}
