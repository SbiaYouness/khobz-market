<?php
include 'db.php';

$response = array();

$select_products = $conn->query("SELECT * FROM products") or die('Query failed');
$response['count'] = $select_products->num_rows;

echo json_encode($response);
?>
