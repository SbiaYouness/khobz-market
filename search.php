<?php
include 'db.php';

header('Content-Type: application/json');

$response = array();

if (isset($_GET['search'])) {
    $search_item = $_GET['search'];
    $select_products = $conn->query("SELECT * FROM products WHERE name LIKE '%$search_item%'");

    if ($select_products->num_rows > 0) {
        while ($fetch_product = $select_products->fetch_assoc()) {
            $response[] = array(
                'id' => $fetch_product['id'],
                'name' => $fetch_product['name'],
                'price' => $fetch_product['price'],
                'image' => $fetch_product['image']
            );
        }
    }
}

echo json_encode($response);
?>