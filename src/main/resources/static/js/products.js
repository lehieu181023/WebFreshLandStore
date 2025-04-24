// products.js - JavaScript cho trang quản lý sản phẩm

document.addEventListener('DOMContentLoaded', function() {

    // Xử lý lọc sản phẩm theo danh mục
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // Xử lý lọc sản phẩm theo tình trạng kho
    const stockFilter = document.getElementById('stockFilter');
    if (stockFilter) {
        stockFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // Xử lý tìm kiếm sản phẩm
    const searchProduct = document.getElementById('searchProduct');
    if (searchProduct) {
        searchProduct.addEventListener('input', function() {
            filterProducts();
        });
    }
});


// Lọc sản phẩm
function filterProducts() {
    const categoryValue = document.getElementById('categoryFilter').value;
    const stockValue = document.getElementById('stockFilter').value;
    const searchText = document.getElementById('searchProduct').value.toUpperCase();
    const table = document.getElementById('productTableBody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const categoryCell = rows[i].cells[3].textContent;
        const stockCell = rows[i].cells[6].textContent;
        const productName = rows[i].cells[2].textContent.toUpperCase();
        
        // Áp dụng bộ lọc
        const categoryMatch = categoryValue === '' || categoryCell.toLowerCase().includes(categoryValue.toLowerCase());
        const stockMatch = stockValue === '' || stockCell.toLowerCase().includes(stockValue.toLowerCase());
        const searchMatch = productName.indexOf(searchText) > -1;
        
        if (categoryMatch && stockMatch && searchMatch) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}