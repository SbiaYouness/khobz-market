<?php
include 'db.php';

$select_products = $conn->query("SELECT * FROM products") or die('query failed');
$products = [];

if ($select_products->num_rows > 0) {
    while ($fetch_products = $select_products->fetch_assoc()) {
        $products[] = $fetch_products;
    }
}

echo json_encode($products);
