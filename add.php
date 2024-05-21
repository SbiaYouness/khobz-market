<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'];
    $image_tmp_name = $_FILES['image']['tmp_name'];
    $image_folder = 'uploaded_img/' . $image;

    if (move_uploaded_file($image_tmp_name, $image_folder)) {
        $conn->query("INSERT INTO products(name, price, image) VALUES('$name', '$price', '$image')") or die('query failed');
        echo 'Product added successfully';
    } else {
        echo 'Failed to upload image';
    }
}