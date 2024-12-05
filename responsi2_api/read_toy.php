<?php
require 'connect.php';
$data = [];
$toy_id = $_GET['user_id'] ?? null; // Note: changed from toy_id to user_id

if ($toy_id) {
    // Ambil mainan berdasarkan user_id
    $query = mysqli_query($connect, "SELECT * FROM toys WHERE user_id='$toy_id'");
    while ($row = mysqli_fetch_object($query)) {
        $data[] = $row;
    }
} else {
    // Jika tidak ada user_id, ambil semua mainan
    $query = mysqli_query($connect, "SELECT * FROM toys");
    while ($row = mysqli_fetch_object($query)) {
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);
exit;