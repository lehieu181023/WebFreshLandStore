// orders.js - JavaScript cho trang quản lý đơn hàng

document.addEventListener('DOMContentLoaded', function() {
    // Sự kiện cho nút Tạo đơn hàng mới
    const addOrderBtn = document.getElementById('addOrderBtn');
    if (addOrderBtn) {
        addOrderBtn.addEventListener('click', function() {
            // Reset form trước khi mở modal
            resetNewOrderForm();
            // Mở modal
            openModal('newOrderModal');
        });
    }
    
    // Sự kiện cho nút Hủy bỏ đơn hàng mới
    const cancelNewOrderBtn = document.getElementById('cancelNewOrderBtn');
    if (cancelNewOrderBtn) {
        cancelNewOrderBtn.addEventListener('click', function() {
            closeModal('newOrderModal');
        });
    }
    
    // Sự kiện cho nút Xem chi tiết đơn hàng
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            // Lấy mã đơn hàng
            const orderNumber = row.cells[0].textContent;
            // Hiển thị mã đơn hàng trong modal
            document.getElementById('orderNumber').textContent = orderNumber;
            // Mở modal
            openModal('orderModal');
            
            // Ở đây sẽ có code tải chi tiết đơn hàng từ server
            // Nhưng trong demo này chúng ta đã có sẵn dữ liệu trong HTML
        });
    });
    
    // Sự kiện cho nút In đơn hàng
    const printBtns = document.querySelectorAll('.print-btn');
    printBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Code in đơn hàng ở đây
            alert('Tính năng in đơn hàng sẽ được triển khai sau.');
        });
    });
    
    // Sự kiện cho nút In hóa đơn trong modal
    const printOrderBtn = document.getElementById('printOrderBtn');
    if (printOrderBtn) {
        printOrderBtn.addEventListener('click', function() {
            // Code in hóa đơn ở đây
            alert('Tính năng in hóa đơn sẽ được triển khai sau.');
        });
    }
    
    // Sự kiện cho nút Lưu thay đổi trong modal
    const saveOrderBtn = document.getElementById('saveOrderBtn');
    if (saveOrderBtn) {
        saveOrderBtn.addEventListener('click', function() {
            // Lấy trạng thái mới
            const newStatus = document.getElementById('orderStatus').value;
            // Lấy mã đơn hàng
            const orderNumber = document.getElementById('orderNumber').textContent;
            
            // Cập nhật trạng thái của đơn hàng trong bảng
            const table = document.getElementById('orderTableBody');
            const rows = table.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].cells[0].textContent === orderNumber) {
                    const statusCell = rows[i].cells[6].querySelector('span');
                    statusCell.className = 'status ' + newStatus;
                    
                    // Thay đổi văn bản trạng thái
                    if (newStatus === 'completed') {
                        statusCell.textContent = 'Hoàn thành';
                    } else if (newStatus === 'pending') {
                        statusCell.textContent = 'Đang xử lý';
                    } else if (newStatus === 'cancelled') {
                        statusCell.textContent = 'Đã hủy';
                    }
                    break;
                }
            }
            
            // Đóng modal sau khi lưu
            closeModal('orderModal');
            alert('Đã cập nhật trạng thái đơn hàng thành công!');
        });
    }
    
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
    
    // Form tạo đơn hàng mới
    const newOrderForm = document.getElementById('newOrderForm');
    if (newOrderForm) {
        newOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Kiểm tra có sản phẩm trong đơn hàng không
            const orderItems = document.getElementById('newOrderItems');
            if (orderItems.children.length === 0) {
                alert('Vui lòng thêm ít nhất một sản phẩm vào đơn hàng!');
                return;
            }
            
            // Xử lý tạo đơn hàng mới
            // Ở đây sẽ có code gửi dữ liệu đơn hàng đến server
            
            alert('Đã tạo đơn hàng mới thành công!');
            closeModal('newOrderModal');
            
            // Trong thực tế, server sẽ trả về mã đơn hàng mới và chúng ta sẽ làm mới danh sách đơn hàng
            // hoặc chuyển hướng đến trang chi tiết đơn hàng vừa tạo
        });
    }
    
    // Xử lý thay đổi giảm giá
    const newOrderDiscount = document.getElementById('newOrderDiscount');
    if (newOrderDiscount) {
        newOrderDiscount.addEventListener('input', function() {
            calculateOrderTotal();
        });
    }
});

// Reset form tạo đơn hàng mới
function resetNewOrderForm() {
    const form = document.getElementById('newOrderForm');
    if (form) {
        form.reset();
        
        // Xóa tất cả sản phẩm đã thêm
        const orderItems = document.getElementById('newOrderItems');
        if (orderItems) {
            orderItems.innerHTML = '';
        }
        
        // Reset tổng tiền
        document.getElementById('newOrderSubtotal').textContent = '0 ₫';
        document.getElementById('newOrderTotal').textContent = '0 ₫';
    }
}

// Lọc đơn hàng
function filterOrders() {
    const statusValue = document.getElementById('statusFilter').value;
    const startDateValue = document.getElementById('startDate').value;
    const endDateValue = document.getElementById('endDate').value;
    
    const table = document.getElementById('orderTableBody');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const statusCell = rows[i].cells[6].querySelector('span').className;
        const dateCell = rows[i].cells[2].textContent;
        
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateParts = dateCell.split('/');
        const orderDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        
        // Chuyển đổi chuỗi ngày lọc thành đối tượng Date
        const startDate = startDateValue ? new Date(startDateValue) : null;
        const endDate = endDateValue ? new Date(endDateValue) : null;
        
        // Xác định xem hàng hiện tại có phù hợp với các bộ lọc không
        let showRow = true;
        
        // Lọc theo trạng thái
        if (statusValue && !statusCell.includes(statusValue)) {
            showRow = false;
        }
        
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

// Mở modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Thêm sự kiện đóng modal khi click vào nút X
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeModal(modalId);
            });
        }
        
        // Thêm sự kiện đóng modal khi click bên ngoài modal
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

// Đóng modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
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

// Thêm sản phẩm vào đơn hàng
function addProductToOrder(product) {
    const orderItems = document.getElementById('newOrderItems');
    
    // Kiểm tra xem sản phẩm đã có trong đơn hàng chưa
    const existingRows = orderItems.querySelectorAll('tr');
    for (let i = 0; i < existingRows.length; i++) {
        const productId = existingRows[i].querySelector('td:first-child').textContent;
        if (productId === product.id) {
            // Tăng số lượng nếu sản phẩm đã tồn tại
            const quantityInput = existingRows[i].querySelector('input[type="number"]');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateProductTotal(quantityInput);
            return;
        }
    }
    
    // Thêm sản phẩm mới nếu chưa có
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>
            <input type="number" value="1" min="1" 
                onchange="updateProductTotal(this)" 
                onkeyup="updateProductTotal(this)">
        </td>
        <td>${formatCurrency(product.price)}</td>
        <td>${formatCurrency(product.price)}</td>
        <td>
            <button type="button" class="btn remove-btn" onclick="removeProductFromOrder(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    // Lưu giá sản phẩm vào thuộc tính dữ liệu
    row.dataset.price = product.price;
    
    orderItems.appendChild(row);
    
    // Cập nhật tổng tiền
    calculateOrderTotal();
}

// Cập nhật thành tiền của sản phẩm khi thay đổi số lượng
function updateProductTotal(input) {
    const row = input.closest('tr');
    const quantity = parseInt(input.value) || 0;
    const price = parseFloat(row.dataset.price) || 0;
    const total = quantity * price;
    
    // Cập nhật cell thành tiền
    row.cells[4].textContent = formatCurrency(total);
    
    // Cập nhật tổng tiền đơn hàng
    calculateOrderTotal();
}

// Xóa sản phẩm khỏi đơn hàng
function removeProductFromOrder(button) {
    const row = button.closest('tr');
    row.remove();
    
    // Cập nhật tổng tiền đơn hàng
    calculateOrderTotal();
}

// Tính tổng tiền đơn hàng
function calculateOrderTotal() {
    const orderItems = document.getElementById('newOrderItems');
    const rows = orderItems.querySelectorAll('tr');
    
    let subtotal = 0;
    
    // Tính tổng tiền hàng
    rows.forEach(row => {
        const totalCell = row.cells[4].textContent;
        const total = parseFloat(totalCell.replace(/[^0-9]/g, '')) || 0;
        subtotal += total;
    });
    
    // Hiển thị tổng tiền hàng
    document.getElementById('newOrderSubtotal').textContent = formatCurrency(subtotal);
    
    // Tính tổng thanh toán (đã trừ giảm giá)
    const discount = parseFloat(document.getElementById('newOrderDiscount').value) || 0;
    const total = subtotal - discount;
    
    // Hiển thị tổng thanh toán
    document.getElementById('newOrderTotal').textContent = formatCurrency(total);
}

// Định dạng số thành chuỗi tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency', 
        currency: 'VND',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0
    }).format(amount).replace('₫', '₫');
}

// Thêm sự kiện đóng modal cho tất cả các modal khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Tìm tất cả các modal trong trang
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Thêm sự kiện đóng modal khi click vào nút X
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Thêm sự kiện đóng modal khi click bên ngoài modal
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});