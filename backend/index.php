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
} elseif ($method === 'PUT' && preg_match('/\/api\/portfolio\/(\d+)/', $uri, $matches)) {
    updatePortfolioDetail($matches[1]);
} elseif ($method === 'POST' && preg_match('/\/api\/checkout\/(\d+)/', $uri, $matches)) {
    createCheckoutSession($matches[1]);
} elseif ($method === 'GET' && preg_match('/\/api\/checkout-session\/(.+)/', $uri, $matches)) {
    getCheckoutSession($matches[1]);
} elseif ($method === 'POST' && preg_match('/\/api\/transaction\/success\/(.+)\/(\d+)/', $uri, $matches)) {
    // New API route for handling successful transactions
    $sessionId = $matches[1];
    $paintingId = $matches[2];
    handleSuccessfulTransaction($sessionId, $paintingId);
} else {
    if (strpos($uri, '/api/') === 0) {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['message' => 'Endpoint not found']);
    } else {
        // Serve the React app for any non-API routes
        include_once("public/index.html");
    }
}
