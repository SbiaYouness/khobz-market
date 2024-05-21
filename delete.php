<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $conn->query("DELETE FROM products WHERE id='$id'") or die('query failed');
    echo 'Product deleted successfully';
}