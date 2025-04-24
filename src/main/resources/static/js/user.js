// products.js - JavaScript cho trang quản lý sản phẩm

document.addEventListener('DOMContentLoaded', function() {

    // Xử lý lọc sản phẩm theo danh mục
    const categoryFilter = document.getElementById('statusFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterProducts();
        });
    }

    // Xử lý tìm kiếm sản phẩm
    const searchProduct = document.getElementById('searchUser');
    if (searchProduct) {
        searchProduct.addEventListener('input', function() {
            filterProducts();
        });
    }
});


// Lọc sản phẩm
function filterProducts() {
    const categoryValue = document.getElementById('statusFilter').value;
    const searchText = document.getElementById('searchUser').value.toUpperCase();
    const table = document.getElementById('UserTableBody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const categoryCell = rows[i].cells[6].textContent;
        const productName = rows[i].cells[1].textContent.toUpperCase();
        
        // Áp dụng bộ lọc
        const categoryMatch = categoryValue === '' || categoryCell.toLowerCase().includes(categoryValue.toLowerCase());
        const searchMatch = productName.indexOf(searchText) > -1;
        
        if (categoryMatch && searchMatch) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}