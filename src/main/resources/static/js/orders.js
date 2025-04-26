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
const SubmitPay = document.getElementById('btn-submit-order');

// Lưu trữ dữ liệu sản phẩm và danh mục
let products = [];
let categories = [];

// Fetch dữ liệu từ API
async function fetchData() {
    try {
        const response = await fetch('/GetProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Lưu dữ liệu sản phẩm và danh mục
        products = data.product || [];
        categories = data.category || [];

        // Cập nhật giao diện
        setupCategoryBadges();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
    }
}

// Thiết lập các category badges dựa trên dữ liệu từ API
function setupCategoryBadges() {
    const categoryFilterContainer = document.querySelector('.category-filter');
    categoryFilterContainer.innerHTML = ''; // Xóa badges hiện tại

    // Thêm badge "Tất cả"
    const allBadge = document.createElement('div');
    allBadge.className = 'category-badge active';
    allBadge.dataset.category = 'all';
    allBadge.textContent = 'Tất cả';
    categoryFilterContainer.appendChild(allBadge);

    // Thêm badges cho các danh mục từ API
    categories.forEach(category => {
        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.dataset.category = category.id.toString();
        badge.textContent = category.name;
        categoryFilterContainer.appendChild(badge);
    });

    // Cập nhật event listeners cho badges
    document.querySelectorAll('.category-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            // Xóa class active từ tất cả badges
            document.querySelectorAll('.category-badge').forEach(b => b.classList.remove('active'));

            // Thêm class active cho badge được chọn
            badge.classList.add('active');

            // Lọc sản phẩm
            searchProducts();
        });
    });
}

// Hiển thị sản phẩm trong danh sách
function displayProducts(productsToShow) {
    productGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;

        // Xác định icon dựa trên category
        let iconClass = 'fa-box';
        if (product.category) {
            // Có thể map từ tên category sang icon tương ứng
            switch (product.category.name.toLowerCase()) {
                case 'thực phẩm':
                    iconClass = 'fa-utensils';
                    break;
                case 'đồ uống':
                    iconClass = 'fa-mug-hot';
                    break;
                case 'gia dụng':
                    iconClass = 'fa-home';
                    break;
                case 'chăm sóc cá nhân':
                    iconClass = 'fa-pump-soap';
                    break;
                default:
                    iconClass = 'fa-box';
            }
        }

        productCard.innerHTML = `
            <div class="product-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-status">${product.status}</div>
        `;

        productCard.addEventListener('click', () => {
            addToCart(product);
        });

        productGrid.appendChild(productCard);
    });
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Kiểm tra xem sản phẩm còn hàng không
    if (product.status === 'Out of stock') {
        alert('Sản phẩm này hiện đã hết hàng!');
        return;
    }

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // Kiểm tra số lượng tồn kho
        if (existingItem.quantity >= product.quantity) {
            alert('Số lượng sản phẩm này trong kho không đủ!');
            return;
        }
        existingItem.quantity += 1;
    } else {
        // Kiểm tra số lượng tồn kho
        if (product.quantity <= 0) {
            alert('Sản phẩm này hiện đã hết hàng!');
            return;
        }

        let iconClass = 'fa-box';
        if (product.category) {
            // Có thể map từ tên category sang icon tương ứng
            switch (product.category.name.toLowerCase()) {
                case 'thực phẩm':
                    iconClass = 'fa-utensils';
                    break;
                case 'đồ uống':
                    iconClass = 'fa-mug-hot';
                    break;
                case 'gia dụng':
                    iconClass = 'fa-home';
                    break;
                case 'chăm sóc cá nhân':
                    iconClass = 'fa-pump-soap';
                    break;
                default:
                    iconClass = 'fa-box';
            }
        }

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            maxQuantity: product.quantity, // Số lượng tồn kho tối đa
            quantity: 1,
            icon: iconClass
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

            cartItem.innerHTML = `
                <div class="cart-product-info">
                    <input type="hidden" name="id" value="${item.id}"></input>
                    <input type="hidden" name="quantity" value="${item.quantity}"></input>

                    <div><i class="fas ${item.icon}"></i></div>
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
        // Kiểm tra số lượng tồn kho
        if (item.quantity >= item.maxQuantity) {
            alert('Số lượng sản phẩm này trong kho không đủ!');
            return;
        }
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
    // Chuyển đổi từ BigDecimal sang số thường nếu cần
    const numericPrice = typeof price === 'object' && price !== null ? Number(price) : price;
    return `${numericPrice.toLocaleString('vi-VN')} ₫`;
}

// Tìm kiếm sản phẩm
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.category-badge.active').dataset.category;

    let filteredProducts = products;

    if (activeCategory !== 'all') {
        const categoryId = parseInt(activeCategory);
        filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
    }

    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts(filteredProducts);
}

function showQRCode(paymentMethod) {
    document.querySelector('.payment-methods').style.display = 'none';

    let qrCodeContainer = document.querySelector('#qrCodeContainer');

    if (!qrCodeContainer) {
        qrCodeContainer = document.createElement('div');
        qrCodeContainer.id = 'qrCodeContainer';
        qrCodeContainer.style.display = 'flex';
        qrCodeContainer.style.flexDirection = 'column';
        qrCodeContainer.style.alignItems = 'center';
        document.querySelector('.modal-content').appendChild(qrCodeContainer);
    } else {
        qrCodeContainer.style.display = 'flex';
        qrCodeContainer.hidden = false;
    }

    const grandTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.1;

    let paymentInfo = '';

    if (paymentMethod === 'momo') {
        paymentInfo = `
            <h3>Thanh toán MoMo</h3>
            <p>Số tiền: ${formatPrice(grandTotal)}</p>
            <p>Quét mã QR bên dưới để thanh toán:</p>
            <img src="/img/logo.png" alt="QR MoMo" style="width:200px;">
        `;
    } else if (paymentMethod === 'vnpay') {
        paymentInfo = `
            <h3>Thanh toán VnPay</h3>
            <p>Số tiền: ${formatPrice(grandTotal)}</p>
            <p>Quét mã QR bên dưới để thanh toán:</p>
            <img src="/img/logo.png" alt="QR VnPay" style="width:200px;">
        `;
    }

    qrCodeContainer.innerHTML = paymentInfo;

    const cancelBtn = document.getElementById('closeModal');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            hideQRCode();
            qrCodeContainer.hidden = true;
        });
    }
}

function hideQRCode() {
    document.querySelector('.payment-methods').style.display = 'grid';
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    if (qrCodeContainer) {
        qrCodeContainer.style.display = 'none';
    }
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
        // Ở đây có thể thêm logic gửi đơn hàng lên server
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

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    // Tải dữ liệu từ API ngay khi trang được load
    fetchData();

    // Xử lý tìm kiếm
    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            searchProducts();
        }
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
                // Xóa class selected từ tất cả phương thức
                paymentMethods.forEach(m => m.classList.remove('selected'));

                // Thêm class selected cho phương thức được chọn
                method.classList.add('selected');

                // Bật nút xác nhận
                confirmPaymentBtn.disabled = false;
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
            SubmitPay.click();
            paymentModal.style.display = 'none';
        }
    });
});