// products.js - JavaScript cho trang quản lý sản phẩm

document.addEventListener('DOMContentLoaded', function() {
    // Sự kiện cho nút Thêm sản phẩm
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            // Reset form trước khi mở modal
            resetProductForm();
            // Thay đổi tiêu đề modal
            document.getElementById('modalTitle').textContent = 'Thêm sản phẩm mới';
            // Mở modal
            openModal('productModal');
        });
    }
    
    // Sự kiện cho nút Hủy bỏ
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeModal('productModal');
        });
    }
    
    // Sự kiện cho nút Sửa sản phẩm
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            // Lấy thông tin sản phẩm từ hàng được chọn
            const productCode = row.cells[0].textContent;
            const productName = row.cells[2].textContent;
            const productCategory = row.cells[3].textContent;
            const productPrice = row.cells[4].textContent.replace(/\D/g, '');
            const productStock = row.cells[5].textContent;
            
            // Điền thông tin vào form
            document.getElementById('productCode').value = productCode;
            document.getElementById('productName').value = productName;
            document.getElementById('productPrice').value = productPrice;
            document.getElementById('productStock').value = productStock;
            
            // Chọn danh mục
            const categorySelect = document.getElementById('productCategory');
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].text === productCategory) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
            
            // Thay đổi tiêu đề modal
            document.getElementById('modalTitle').textContent = 'Sửa sản phẩm';
            // Mở modal
            openModal('productModal');
            
            // Vô hiệu hóa trường mã sản phẩm trong chế độ sửa
            document.getElementById('productCode').readOnly = true;
        });
    });
    
    // Sự kiện cho nút Xóa sản phẩm
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                const row = this.closest('tr');
                row.remove();
                
                // Ở đây sẽ có code gửi yêu cầu xóa sản phẩm đến máy chủ
                // Nhưng trong demo này chúng ta chỉ xóa phần tử DOM
                alert('Đã xóa sản phẩm thành công!');
            }
        });
    });
    
    // Xử lý form thêm/sửa sản phẩm
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ở đây sẽ có code xử lý lưu sản phẩm
            alert('Đã lưu sản phẩm thành công!');
            closeModal('productModal');
        });
    }
    
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

// Reset form thêm sản phẩm
function resetProductForm() {
    const form = document.getElementById('productForm');
    if (form) {
        form.reset();
        document.getElementById('productCode').readOnly = false;
    }
}

// Lọc sản phẩm
function filterProducts() {
    const categoryValue = document.getElementById('categoryFilter').value;
    const stockValue = document.getElementById('stockFilter').value;
    const searchText = document.getElementById('searchProduct').value.toUpperCase();
    const table = document.getElementById('productTableBody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const categoryCell = rows[i].cells[3].textContent;
        const stockCell = parseInt(rows[i].cells[5].textContent);
        const productName = rows[i].cells[2].textContent.toUpperCase();
        
        // Xác định trạng thái kho
        let stockStatus = '';
        if (stockCell === 0) {
            stockStatus = 'outofstock';
        } else if (stockCell <= 20) {
            stockStatus = 'lowstock';
        } else {
            stockStatus = 'instock';
        }
        
        // Áp dụng bộ lọc
        const categoryMatch = categoryValue === '' || categoryCell.toLowerCase().includes(categoryValue.toLowerCase());
        const stockMatch = stockValue === '' || stockStatus === stockValue;
        const searchMatch = productName.indexOf(searchText) > -1;
        
        if (categoryMatch && stockMatch && searchMatch) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}