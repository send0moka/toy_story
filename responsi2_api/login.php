<?php
require 'connect.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$username = mysqli_real_escape_string($connect, trim($data['username']));
$password = trim($data['password']);

header('Content-Type: application/json');
$query = mysqli_query($connect, "SELECT * FROM users WHERE username='$username'");

if ($query) {
    if (mysqli_num_rows($query) > 0) {
        $user = mysqli_fetch_object($query);
        
        if (password_verify($password, $user->password)) {
            $response = [
                'status' => true,
                'message' => 'Login successful',
                'data' => [
                    'user_id' => $user->user_id,
                    'username' => $user->username
                ]
            ];
        } else {
            $response = [
                'status' => false,
                'message' => 'Incorrect password'
            ];
        }
    } else {
        $response = [
            'status' => false,
            'message' => 'Username not found'
        ];
    }
} else {
    $response = [
        'status' => false,
        'message' => 'Error: ' . mysqli_error($connect)
    ];
}

echo json_encode($response);