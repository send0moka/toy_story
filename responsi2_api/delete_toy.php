<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$toy_id = $_GET['toy_id'] ?? $data['toy_id'];
$query = mysqli_query($connect, "DELETE FROM toys WHERE toy_id='$toy_id'");

if ($query) {
    http_response_code(201);
    $response = [
        'status' => 'success',
        'message' => 'Toy deleted successfully'
    ];
} else {
    http_response_code(422);
    $response = [
        'status' => 'failed',
        'message' => 'Failed to delete toy'
    ];
}

echo json_encode($response);
echo mysqli_error($connect);