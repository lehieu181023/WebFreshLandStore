// orders.js - JavaScript cho trang quản lý đơn hàng

document.addEventListener('DOMContentLoaded', function() {

    // Xử lý tìm kiếm đơn hàng
    const searchOrder = document.getElementById('searchOrder');
    if (searchOrder) {
        searchOrder.addEventListener('input', function() {
            performSearch('searchOrder', 'orderTableBody', 0); // Tìm theo mã đơn
        });
    }
    
    // Xử lý lọc theo trạng thái
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterOrders();
        });
    }
    
    // Xử lý lọc theo ngày
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    if (startDate && endDate) {
        startDate.addEventListener('change', filterOrders);
        endDate.addEventListener('change', filterOrders);
    }
    
    // Xử lý tìm kiếm sản phẩm trong form tạo đơn hàng mới
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }

    

});



// Lọc đơn hàng
function filterOrders() {
    const startDateValue = document.getElementById('startDate').value;
    const endDateValue = document.getElementById('endDate').value;
    
    const table = document.getElementById('orderTableBody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const dateCell = rows[i].cells[3].textContent;
        
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateParts = dateCell.split('/');
        const orderDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        
        // Chuyển đổi chuỗi ngày lọc thành đối tượng Date
        const startDate = startDateValue ? new Date(startDateValue) : null;
        const endDate = endDateValue ? new Date(endDateValue) : null;
        
        // Xác định xem hàng hiện tại có phù hợp với các bộ lọc không
        let showRow = true;
        

        
        // Lọc theo ngày bắt đầu
        if (startDate && orderDate < startDate) {
            showRow = false;
        }
        
        // Lọc theo ngày kết thúc
        if (endDate) {
            // Đặt giờ của ngày kết thúc thành cuối ngày
            endDate.setHours(23, 59, 59, 999);
            if (orderDate > endDate) {
                showRow = false;
            }
        }
        
        // Hiển thị hoặc ẩn hàng
        rows[i].style.display = showRow ? '' : 'none';
    }
}

// Tìm kiếm theo nội dung
function performSearch(inputId, tableId, columnIndex) {
    const searchText = document.getElementById(inputId).value.toLowerCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const cellText = rows[i].cells[columnIndex].textContent.toLowerCase();
        
        if (cellText.includes(searchText)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}


// Tìm kiếm sản phẩm
function searchProducts(keyword) {
    if (keyword.length < 2) {
        document.getElementById('productSuggestions').innerHTML = '';
        return;
    }
    
    // Trong thực tế, đây sẽ là API call đến server để lấy sản phẩm
    // Nhưng trong demo này, chúng ta sẽ sử dụng dữ liệu mẫu
    const products = [
        { id: 'SP001', name: 'Sữa tươi Vinamilk 180ml', price: 12000 },
        { id: 'SP002', name: 'Mì Hảo Hảo tôm chua cay', price: 3500 },
        { id: 'SP003', name: 'Nước ngọt Coca Cola 330ml', price: 10000 },
        { id: 'SP004', name: 'Dầu ăn Neptune 1L', price: 45000 },
        { id: 'SP005', name: 'Nước mắm Nam Ngư 500ml', price: 25000 },
        { id: 'SP006', name: 'Bánh Oreo 137g', price: 18000 },
        { id: 'SP007', name: 'Gạo Ngọc Đỏ 5kg', price: 120000 },
        { id: 'SP008', name: 'Sữa Ensure Gold 850g', price: 790000 },
        { id: 'SP009', name: 'Dầu gội Head & Shoulders 650ml', price: 135000 },
        { id: 'SP010', name: 'Nước rửa chén Sunlight 400g', price: 50000 }
    ];
    
    // Lọc sản phẩm dựa trên từ khóa
    const keyword_lower = keyword.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(keyword_lower) || 
        product.id.toLowerCase().includes(keyword_lower));
    
    // Hiển thị kết quả
    const suggestionsContainer = document.getElementById('productSuggestions');
    suggestionsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        suggestionsContainer.innerHTML = '<p>Không tìm thấy sản phẩm phù hợp.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div>
                <span class="product-code">${product.id}</span>
                <span class="product-name">${product.name}</span>
            </div>
            <span class="product-price">${formatCurrency(product.price)}</span>
        `;
        
        productItem.addEventListener('click', function() {
            addProductToOrder(product);
            suggestionsContainer.innerHTML = '';
            document.getElementById('productSearch').value = '';
        });
        
        suggestionsContainer.appendChild(productItem);
    });
}

