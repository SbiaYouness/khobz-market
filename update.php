<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $old_image = $_POST['old_image'];

    if (isset($_FILES['image']['name']) && $_FILES['image']['name'] != '') {
        $image = $_FILES['image']['name'];
        $image_tmp_name = $_FILES['image']['tmp_name'];
        $image_folder = $image;
        move_uploaded_file($image_tmp_name, $image_folder);
    } else {
        $image_folder = $old_image;
    }

    $conn->query("UPDATE products SET name='$name', price='$price', image='$image_folder' WHERE id='$id'") or die('query failed');
    echo 'Product updated successfully';
}