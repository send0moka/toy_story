<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_id = intval($data['user_id']);
$toy_name = mysqli_real_escape_string($connect, trim($data['toy_name']));
$toy_description = mysqli_real_escape_string($connect, trim($data['toy_description']));

http_response_code(201);
if ($user_id > 0 && $toy_name != '') {
    $query = mysqli_query($connect, "INSERT INTO toys (user_id, toy_name, toy_description) VALUES ('$user_id', '$toy_name', '$toy_description')");
    $response = [
        'status' => $query ? true : false,
        'message' => $query ? 'Toy added successfully' : 'Failed to add toy'
    ];
} else {
    $response = [
        'status' => false,
        'message' => 'Invalid input data'
    ];
}

echo json_encode($response);
echo mysqli_error($connect);