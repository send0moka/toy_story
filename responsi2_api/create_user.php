<?php
require 'connect.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$username = mysqli_real_escape_string($connect, trim($data['username']));
$password = password_hash(trim($data['password']), PASSWORD_DEFAULT);

http_response_code(201);
if ($username != '' && $password != '') {
    $query = mysqli_query($connect, "INSERT INTO users (username, password) VALUES ('$username', '$password')");
    $response = [
        'status' => $query ? true : false,
        'message' => $query ? 'User registration successful' : 'Registration failed'
    ];
} else {
    $response = [
        'status' => false,
        'message' => 'Invalid input data'
    ];
}

echo json_encode($response);
echo mysqli_error($connect);