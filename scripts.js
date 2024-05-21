$(document).ready(function () {
    // Products Page Scripts
    if ($('body').hasClass('page-products')) {
        // Load products
        function fetchProducts() {
            $.ajax({
                url: "get.php",
                type: "GET",
                success: function (response) {
                    const products = JSON.parse(response);
                    $("#productContainer").empty();
                    products.forEach((product) => {
                        $("#productContainer").append(`
                <div class="box">
                    <img src="uploaded_img/${product.image}" alt="Product" class="image">
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price} MAD</div>
                   <button class="option-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Update</button>
                   <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
             `);
                    });
                },
            });
        }

        // Add product form submission
        $('#addProductForm').submit(function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            $.ajax({
                url: 'add.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    alert(response);
                    fetchProducts();
                    $('#addProductForm')[0].reset();
                }
            });
        });

        // Load products on page load
        fetchProducts();
    }

    // Search Page Scripts
    if ($('body').hasClass('page-search')) {
        $("#searchProductForm").submit(function (e) {
            e.preventDefault();
            const searchTerm = $("#search").val();
            $.ajax({
                url: "search.php",
                type: "GET",
                data: { search: searchTerm },
                success: function (response) {
                    $("#searchResultsContainer").empty();
                    if (response.length > 0) {
                        response.forEach((product) => {
                            $("#searchResultsContainer").append(`
                                <div class="box">
                                    <img src="uploaded_img/${product.image}" alt="Product" class="image">
                                    <div class="name">${product.name}</div>
                                    <div class="price">${product.price} MAD</div>
                                    <a href="#" class="option-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.image}')">update</a>
                                    <a href="#" class="delete-btn" onclick="deleteProduct(${product.id})">delete</a>
                                </div>
                            `);
                        });
                    } else {
                        $("#searchResultsContainer").append('<p class="empty-message">No products found</p>');
                    }
                }
            });
        });

        // Update product form submission
        $("#updateProductForm").submit(function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            $.ajax({
                url: "update.php",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    alert(response);
                    $("#searchProductForm").submit();
                    $(".edit-product-form").hide();
                }
            });
        });

        // Close update form
        $("#close-update").click(function () {
            $(".edit-product-form").hide();
        });
    }

    // Common functions
    window.editProduct = function (id, name, price, image) {
        $("#update_id").val(id);
        $("#update_name").val(name);
        $("#update_price").val(price);
        $("#update_old_image").val(image);
        $("#update_img").attr("src", image);
        $(".edit-product-form").show();
    };

    window.deleteProduct = function (id) {
        if (confirm('Delete this product?')) {
            $.ajax({
                url: 'delete.php',
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    alert(response);
                    if ($('body').hasClass('page-products')) {
                        fetchProducts();
                    } else if ($('body').hasClass('page-search')) {
                        $("#searchProductForm").submit();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    alert('Failed to delete product');
                }
            });
        }
    };
    // Function to fetch product count
    function fetchProductCount() {
        $.ajax({
            url: 'product_count.php',
            type: 'GET',
            success: function(response) {
                const data = JSON.parse(response);
                $("#number_of_products").text(data.count);
            }
        });
    }

    // Check if the current page is the home page and call fetchProductCount if true
    if ($('body').hasClass('page-home')) {
        fetchProductCount();
    }
});
