<?php
require 'connect.php';
header('Content-Type: application/json');

if (isset($_GET['story_id'])) {
    $story_id = mysqli_real_escape_string($connect, $_GET['story_id']);

    $query = mysqli_query($connect, "DELETE FROM toy_stories WHERE story_id = '$story_id'");

    if ($query) {
        $response = [
            'status' => true,
            'message' => 'Story berhasil dihapus'
        ];
    } else {
        $response = [
            'status' => false,
            'message' => 'Gagal menghapus story: ' . mysqli_error($connect)
        ];
    }
} else {
    $response = [
        'status' => false,
        'message' => 'Story ID tidak diberikan'
    ];
}

echo json_encode($response);