// main.js - JavaScript chung cho tất cả các trang

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    checkLoginState();
    
    // Xử lý sự kiện đăng xuất
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        updateLoginButton();
        loginBtn.addEventListener('click', function(e) {
            if (isLoggedIn()) {
                e.preventDefault();
                logout();
            }
        });
    }
});

// Kiểm tra trạng thái đăng nhập
function checkLoginState() {
    if (!isLoggedIn() && requiresAuth()) {
        // Chuyển hướng đến trang đăng nhập nếu trang yêu cầu xác thực
        // window.location.href = 'login.html';
        
        // Vì đây là demo, chúng ta sẽ không chuyển hướng
        console.log('Trang này yêu cầu đăng nhập. Demo sẽ không chuyển hướng.');
    }
}

// Kiểm tra xem người dùng đã đăng nhập chưa
function isLoggedIn() {
    return localStorage.getItem('freshland_user') !== null;
}

// Kiểm tra xem trang hiện tại có yêu cầu xác thực không
function requiresAuth() {
    // Các trang này không yêu cầu đăng nhập
    const publicPages = ['login.html', 'index.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    return !publicPages.includes(currentPage);
}

// Cập nhật nút đăng nhập/đăng xuất
function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        if (isLoggedIn()) {
            const user = JSON.parse(localStorage.getItem('freshland_user'));
            loginBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Đăng xuất (${user.username})`;
        } else {
            loginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Đăng nhập`;
        }
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem('freshland_user');
    updateLoginButton();
    // Chuyển hướng về trang chủ sau khi đăng xuất
    window.location.href = 'index.html';
}

// Định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}

// Mở modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Đóng modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Đóng tất cả modal khi click ra ngoài
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Đóng modal khi nhấn nút đóng
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Chức năng tìm kiếm
function performSearch(searchInput, tableId, columnIndex) {
    const input = document.getElementById(searchInput);
    const filter = input ? input.value.toUpperCase() : '';
    const table = document.getElementById(tableId);
    
    if (table) {
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) {
            const cell = rows[i].getElementsByTagName('td')[columnIndex];
            if (cell) {
                const text = cell.textContent || cell.innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }
            }
        }
    }
}