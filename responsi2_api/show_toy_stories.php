<?php
require 'connect.php';
$data = [];

// Query dengan join untuk mendapatkan nama toy
$query = mysqli_query($connect, "
    SELECT ts.*, t.toy_name 
    FROM toy_stories ts
    LEFT JOIN toys t ON ts.toy_id = t.toy_id
");

while ($row = mysqli_fetch_object($query)) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
exit;