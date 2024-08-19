<?php
// Autoload dependencies using Composer
require 'vendor/autoload.php';

// Load environment variables from the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Include the controller functions
require 'portfolioController.php';

// Routing logic
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if ($method === 'GET' && $uri === '/api/portfolio') {
    getPortfolioDetails();
} elseif ($method === 'POST' && $uri === '/api/portfolio') {
    addPortfolioDetail();
} elseif ($method === 'DELETE' && preg_match('/\/api\/portfolio\/(\d+)/', $uri, $matches)) {
    deletePortfolioDetail($matches[1]);
} else {
    if (strpos($uri, '/api/') === 0) {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['message' => 'Endpoint not found']);
    } else {
        // Serve the React app for any non-API routes
        include_once("public/index.html");
    }
}
