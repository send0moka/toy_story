<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$toy_id = intval($data['toy_id']);
$user_id = intval($data['user_id']);
$story_content = mysqli_real_escape_string($connect, trim($data['story_content']));

http_response_code(201);
if ($toy_id > 0 && $user_id > 0 && $story_content != '') {
    $query = mysqli_query($connect, "INSERT INTO toy_stories (toy_id, user_id, story_content) VALUES ('$toy_id', '$user_id', '$story_content')");
    $response = [
        'status' => $query ? true : false,
        'message' => $query ? 'Toy story added successfully' : 'Failed to add toy story'
    ];
} else {
    $response = [
        'status' => false,
        'message' => 'Invalid input data'
    ];
}

echo json_encode($response);
echo mysqli_error($connect);