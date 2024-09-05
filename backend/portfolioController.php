<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$database = $_ENV['DB_DATABASE'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$twilioSid = $_ENV['TWILIO_SID'];
$twilioAuthToken = $_ENV['TWILIO_AUTH_TOKEN'];
$twilioFromNumber = $_ENV['TWILIO_FROM_NUMBER'];
$twilioToNumber = $_ENV['TWILIO_TO_NUMBER'];

$pdo = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4", $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$twilio = new Twilio\Rest\Client($twilioSid, $twilioAuthToken);

// 1. Read portfolio details
function getPortfolioDetails() {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM portfolio_details");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($results);
}

function getPortfolioDetail($id) {
    global $pdo;

    $stmt = $pdo->prepare("SELECT * FROM portfolio_details WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $result;
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

function updatePortfolioDetail($id) {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $pdo->prepare("UPDATE portfolio_details 
                           SET title = :title, price = :price, type = :type, isFramed = :isFramed, width = :width, height = :height, weight = :weight, details = :details, imageUrls = :imageUrls 
                           WHERE id = :id");
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
        ':id' => $id,
    ]);

    header('Content-Type: application/json');
    echo json_encode(['message' => 'Portfolio detail updated successfully']);
}

// 3. Delete a portfolio entry
function deletePortfolioDetail($id) {
    global $pdo;

    $stmt = $pdo->prepare("DELETE FROM portfolio_details WHERE id = :id");
    $stmt->execute([':id' => $id]);

    header('Content-Type: application/json');
    echo json_encode(['message' => 'Portfolio detail deleted successfully']);
}

// 4. Create Checkout Session
function createCheckoutSession($id) {
    \Stripe\Stripe::setApiKey($_ENV['STRIPE_TEST_SECRET_KEY']);

    $portfolioDetail = getPortfolioDetail($id);

    if (!$portfolioDetail) {
        http_response_code(404);
        echo json_encode(['error' => 'Portfolio item not found']);
        return;
    }

    try {
        $checkoutSession = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $portfolioDetail['title'],
                    ],
                    'unit_amount' => $portfolioDetail['price'],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'shipping_address_collection' => [
                'allowed_countries' => ['US', 'CA'], // Specify allowed countries, or remove this to allow all.
            ],
            'success_url' => 'https://writerstudios.net/order-confirmation?session_id={CHECKOUT_SESSION_ID}&painting_id=' . urlencode($id),
            'cancel_url' => 'https://writerstudios.net/order-failure',
        ]);

        header('Content-Type: application/json');
        echo json_encode(['id' => $checkoutSession->id]);
    } catch (Exception $e) {
        // Encode the error message in the cancel URL
        $encodedErrorMessage = urlencode($e->getMessage());
        header('Location: https://writerstudios.net/order-failure?error_message=' . $encodedErrorMessage);
        exit();
    }
}

function getCheckoutSession($sessionId) {
    \Stripe\Stripe::setApiKey($_ENV['STRIPE_TEST_SECRET_KEY']);

    try {
        // Retrieve the session using the session_id
        $session = \Stripe\Checkout\Session::retrieve($sessionId);

        // Access the shipping details
        $shippingDetails = $session->shipping_details;

        // Return shipping details as JSON
        header('Content-Type: application/json');
        echo json_encode($shippingDetails);
    } catch (Exception $e) {
        // Handle error appropriately
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error retrieving session: ' . $e->getMessage()]);
    }
}

// On success, execute these steps
function handleSuccessfulTransaction($sessionId, $paintingId) {
    global $twilio, $pdo, $twilioFromNumber, $twilioToNumber;
    \Stripe\Stripe::setApiKey($_ENV['STRIPE_TEST_SECRET_KEY']);

    try {
        // 1. Retrieve details about the sold painting
        $paintingDetails = getPortfolioDetail($paintingId);

        // 2. Remove the entry from the database
        deletePortfolioDetail($paintingId);

        // 3. Get the address details from the Stripe checkout session
        $session = \Stripe\Checkout\Session::retrieve($sessionId);
        $shippingDetails = $session->shipping_details;
        $email = $session->customer_details->email;

        // 4. Add a transaction entry to stripe_checkout_sessions
        $stmt = $pdo->prepare("INSERT INTO stripe_checkout_sessions (session_id, painting_id) VALUES (:session_id, :painting_id)");
        $stmt->execute([':session_id' => $sessionId, ':painting_id' => $paintingId]);

        // 5. Send a text message using Twilio API
        $messageBody = "Painting Sold: " . $paintingDetails['title'] . "\n" .
                       "Price: $" . ($paintingDetails['price'] / 100) . "\n" .
                       "Email: " . $email . "\n" .
                       "Shipping to: " . $shippingDetails->name . "\n" .
                       "Address: " . $shippingDetails->address->line1 . ", " .
                                    $shippingDetails->address->city . ", " .
                                    $shippingDetails->address->state . " " .
                                    $shippingDetails->address->postal_code . ", " .
                                    $shippingDetails->address->country;

        $twilio->messages->create(
            $twilioToNumber,
            [
                'from' => $twilioFromNumber,
                'body' => $messageBody
            ]
        );

        echo json_encode(['message' => 'Transaction processed successfully']);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error processing transaction: ' . $e->getMessage()]);
    }
}


