// Danh sách sản phẩm mẫu
const products = [
    { id: 1, name: 'Sữa tươi Vinamilk', price: 12000, category: 'food', icon: 'fa-milk-carton' },
    { id: 2, name: 'Nước giặt OMO', price: 35000, category: 'household', icon: 'fa-jug-detergent' },
    { id: 3, name: 'Dầu gội Head & Shoulders', price: 65000, category: 'personal', icon: 'fa-spray-can-sparkles' },
    { id: 4, name: 'Mì gói Hảo Hảo', price: 3500, category: 'food', icon: 'fa-bowl-food' },
    { id: 5, name: 'Coca Cola', price: 10000, category: 'drink', icon: 'fa-bottle-water' },
    { id: 6, name: 'Bánh mì', price: 15000, category: 'food', icon: 'fa-bread-slice' },
    { id: 7, name: 'Nước lau sàn', price: 45000, category: 'household', icon: 'fa-spray-can' },
    { id: 8, name: 'Khăn giấy', price: 12000, category: 'household', icon: 'fa-toilet-paper' },
    { id: 9, name: 'Kẹo', price: 5000, category: 'food', icon: 'fa-candy-cane' },
    { id: 10, name: 'Sữa tắm', price: 85000, category: 'personal', icon: 'fa-soap' },
    { id: 11, name: 'Trà C2', price: 8000, category: 'drink', icon: 'fa-mug-hot' },
    { id: 12, name: 'Cà phê đen', price: 12000, category: 'drink', icon: 'fa-mug-saucer' },
    { id: 13, name: 'Tương ớt', price: 15000, category: 'food', icon: 'fa-bottle-droplet' },
    { id: 14, name: 'Nước rửa chén', price: 25000, category: 'household', icon: 'fa-plate-utensils' },
    { id: 15, name: 'Xà phòng rửa tay', price: 18000, category: 'personal', icon: 'fa-hands-bubbles' },
    { id: 16, name: 'Dầu ăn', price: 42000, category: 'food', icon: 'fa-oil-can' }
];

// Giỏ hàng
let cart = [];

// Các elements DOM
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const grandTotalElement = document.getElementById('grandTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchProduct');
const searchBtn = document.getElementById('searchBtn');
const categoryBadges = document.querySelectorAll('.category-badge');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const paymentMethods = document.querySelectorAll('.payment-method');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const paymentDetails = document.getElementById('paymentDetails');

// Hiển thị sản phẩm trong danh sách
function displayProducts(productsToShow) {
    productGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        // Kiểm tra xem icon có bắt đầu bằng 'fa-' hay không
        const iconClass = product.icon.startsWith('fa-') ? product.icon : `fa-${product.icon}`;
        
        productCard.innerHTML = `
            <div class="product-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
        `;
        
        productCard.addEventListener('click', () => {
            addToCart(product);
        });
        
        productGrid.appendChild(productCard);
    });
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon
        });
    }
    
    updateCart();
}

// Cập nhật hiển thị giỏ hàng
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng trống</p>
                <p>Vui lòng chọn sản phẩm từ danh sách</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-product';
            
            // Kiểm tra xem icon có bắt đầu bằng 'fa-' hay không
            const iconClass = item.icon.startsWith('fa-') ? item.icon : `fa-${item.icon}`;
            
            cartItem.innerHTML = `
                <div class="cart-product-info">
                    <div><i class="fas ${iconClass}"></i></div>
                    <div>
                        <div>${item.name}</div>
                        <div class="price-info">${formatPrice(item.price)}</div>
                    </div>
                </div>
                <div class="cart-product-actions">
                    <div class="quantity-control">
                        <button class="decrease-btn" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <div class="price-info">${formatPrice(item.price * item.quantity)}</div>
                    <div class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Thêm event listeners
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.target.dataset.id);
                decreaseQuantity(id);
                e.stopPropagation();
            });
        });
        
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.target.dataset.id);
                increaseQuantity(id);
                e.stopPropagation();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.target.closest('.remove-item').dataset.id);
                removeFromCart(id);
                e.stopPropagation();
            });
        });
        
        checkoutBtn.disabled = false;
    }
    
    updateTotals();
}

// Tăng số lượng sản phẩm
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Giảm số lượng sản phẩm
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

// Xóa khỏi giỏ hàng
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Cập nhật tổng tiền
function updateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;
    
    subtotalElement.textContent = formatPrice(subtotal);
    taxElement.textContent = formatPrice(tax);
    grandTotalElement.textContent = formatPrice(grandTotal);
}

// Format số tiền
function formatPrice(price) {
    return `${price.toLocaleString('vi-VN')} ₫`;
}

// Tìm kiếm sản phẩm
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.category-badge.active').dataset.category;
    
    let filteredProducts = products;
    
    if (activeCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === activeCategory);
    }
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts(filteredProducts);
}

// Hiển thị QR Code cho thanh toán điện tử
function showQRCode(paymentMethod) {
    // Ẩn tất cả các phương thức thanh toán
    document.querySelector('.payment-methods').style.display = 'none';
    
    // Hiển thị container QR code
    qrCodeContainer.style.display = 'flex';
    
    // Lấy tổng tiền
    const grandTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.1;
    
    // Đặt thông tin thanh toán
    let paymentInfo = '';
    let qrImageSrc = '';
    
    if (paymentMethod === 'momo') {
        paymentInfo = `
            <h3>Thanh toán MoMo</h3>
            <p>Số tiền: ${formatPrice(grandTotal)}</p>
            <p>Quét mã QR bên dưới để thanh toán:</p>
        `;
        qrImageSrc = 'momo_qr.png'; // Đường dẫn tới ảnh QR của MoMo
    } else if (paymentMethod === 'vnpay') {
        paymentInfo = `
            <h3>Thanh toán VnPay</h3>
            <p>Số tiền: ${formatPrice(grandTotal)}</p>
            <p>Quét mã QR bên dưới để thanh toán:</p>
        `;
        qrImageSrc = 'vnpay_qr.png'; // Đường dẫn tới ảnh QR của VnPay
    }
    
    // Hiển thị thông tin và mã QR giả lập
    paymentDetails.innerHTML = paymentInfo;
    qrCodeContainer.innerHTML = `
        <div class="qr-code-wrapper">
            ${paymentDetails.outerHTML}
            <div class="qr-image">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                    <!-- Mã QR đơn giản mô phỏng -->
                    <rect width="200" height="200" fill="white"/>
                    <g fill="black">
                        <!-- Góc trái trên -->
                        <rect x="20" y="20" width="40" height="10"/>
                        <rect x="20" y="30" width="10" height="30"/>
                        <rect x="50" y="30" width="10" height="30"/>
                        <rect x="20" y="60" width="40" height="10"/>
                        
                        <!-- Góc phải trên -->
                        <rect x="140" y="20" width="40" height="10"/>
                        <rect x="140" y="30" width="10" height="30"/>
                        <rect x="170" y="30" width="10" height="30"/>
                        <rect x="140" y="60" width="40" height="10"/>
                        
                        <!-- Góc trái dưới -->
                        <rect x="20" y="140" width="40" height="10"/>
                        <rect x="20" y="150" width="10" height="30"/>
                        <rect x="50" y="150" width="10" height="30"/>
                        <rect x="20" y="180" width="40" height="10"/>
                        
                        <!-- Mẫu QR ngẫu nhiên -->
                        <rect x="80" y="20" width="10" height="10"/>
                        <rect x="100" y="30" width="10" height="10"/>
                        <rect x="120" y="40" width="10" height="10"/>
                        <rect x="90" y="50" width="10" height="10"/>
                        <rect x="70" y="70" width="10" height="10"/>
                        <rect x="130" y="80" width="10" height="10"/>
                        <rect x="110" y="90" width="10" height="10"/>
                        <rect x="90" y="100" width="10" height="10"/>
                        <rect x="40" y="110" width="10" height="10"/>
                        <rect x="120" y="120" width="10" height="10"/>
                        <rect x="80" y="130" width="10" height="10"/>
                        <rect x="150" y="140" width="10" height="10"/>
                        <rect x="100" y="150" width="10" height="10"/>
                        <rect x="130" y="170" width="10" height="10"/>
                    </g>
                    <!-- Logo cho QR code -->
                    <circle cx="100" cy="100" r="15" fill="white"/>
                    <text x="100" y="104" font-size="14" text-anchor="middle" fill="black">
                        ${paymentMethod === 'momo' ? 'M' : 'V'}
                    </text>
                </svg>
            </div>
            <p class="qr-caption">${paymentMethod === 'momo' ? 'MoMo QR Code' : 'VnPay QR Code'}</p>
            <div class="payment-status">
                <p>Đang chờ thanh toán...</p>
                <div class="loading-spinner"></div>
            </div>
            <div class="qr-actions">
                <button id="cancelQrPayment" class="btn secondary-btn">Hủy</button>
                <button id="simulatePaymentSuccess" class="btn primary-btn">Giả lập thanh toán thành công</button>
            </div>
        </div>
    `;
    
    // Thêm event listeners cho các nút
    document.getElementById('cancelQrPayment').addEventListener('click', () => {
        // Quay lại chọn phương thức thanh toán
        hideQRCode();
    });
    
    document.getElementById('simulatePaymentSuccess').addEventListener('click', () => {
        // Giả lập thanh toán thành công
        simulateSuccessfulPayment(paymentMethod);
    });
}

// Ẩn QR Code và hiển thị lại các phương thức thanh toán
function hideQRCode() {
    document.querySelector('.payment-methods').style.display = 'grid';
    qrCodeContainer.style.display = 'none';
}

// Giả lập thanh toán thành công
function simulateSuccessfulPayment(paymentMethod) {
    const grandTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.1;
    
    // Thay đổi trạng thái
    const paymentStatus = document.querySelector('.payment-status');
    paymentStatus.innerHTML = `
        <p class="success-message">
            <i class="fas fa-check-circle"></i> Thanh toán thành công!
        </p>
    `;
    
    // Thay đổi các nút
    const qrActions = document.querySelector('.qr-actions');
    qrActions.innerHTML = `
        <button id="completePurchase" class="btn primary-btn">
            <i class="fas fa-check"></i> Hoàn tất giao dịch
        </button>
    `;
    
    // Thêm event listener cho nút hoàn tất
    document.getElementById('completePurchase').addEventListener('click', () => {
        alert(`Thanh toán thành công ${formatPrice(grandTotal)} bằng ${getPaymentMethodName(paymentMethod)}!`);
        
        // Reset giỏ hàng
        cart = [];
        updateCart();
        
        // Đóng modal
        paymentModal.style.display = 'none';
        
        // Reset modal cho lần sau
        setTimeout(() => {
            hideQRCode();
        }, 500);
    });
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    // Hiển thị tất cả sản phẩm ban đầu
    displayProducts(products);
    
    // Xử lý tìm kiếm
    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Xử lý lọc theo danh mục
    categoryBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            // Xóa class active từ tất cả badges
            categoryBadges.forEach(b => b.classList.remove('active'));
            
            // Thêm class active cho badge được chọn
            badge.classList.add('active');
            
            // Lọc sản phẩm
            searchProducts();
        });
    });
    
    // Xử lý nút thanh toán
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            paymentModal.style.display = 'flex';
        }
    });
    
    // Đóng modal
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        setTimeout(() => {
            hideQRCode(); // Đảm bảo khi mở lại sẽ hiển thị các phương thức thanh toán
        }, 500);
    });
    
    // Đóng modal khi click bên ngoài
    window.addEventListener('click', e => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            setTimeout(() => {
                hideQRCode();
            }, 500);
        }
    });
    
    // Xử lý chọn phương thức thanh toán
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            const methodName = method.dataset.method;
            
            // Xử lý khác biệt cho MoMo và VnPay
            if (methodName === 'momo' || methodName === 'vnpay') {
                showQRCode(methodName);
            } else {
                // Xóa class selected từ tất cả phương thức
                paymentMethods.forEach(m => m.classList.remove('selected'));
                
                // Thêm class selected cho phương thức được chọn
                method.classList.add('selected');
                
                // Bật nút xác nhận
                confirmPaymentBtn.disabled = false;
            }
        });
    });
    
    // Xử lý nút xác nhận thanh toán (chỉ cho phương thức tiền mặt và thẻ)
    confirmPaymentBtn.addEventListener('click', () => {
        const selectedMethod = document.querySelector('.payment-method.selected');
        
        if (selectedMethod) {
            const methodName = selectedMethod.dataset.method;
            const grandTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.1;
            
            alert(`Thanh toán thành công ${formatPrice(grandTotal)} bằng ${getPaymentMethodName(methodName)}!`);
            
            // Reset giỏ hàng
            cart = [];
            updateCart();
            
            // Đóng modal
            paymentModal.style.display = 'none';
        }
    });
});

// Hiển thị tên phương thức thanh toán
function getPaymentMethodName(method) {
    switch (method) {
        case 'cash': return 'Tiền mặt';
        case 'card': return 'Thẻ';
        case 'momo': return 'MoMo';
        case 'vnpay': return 'VnPay';
        default: return method;
    }
}