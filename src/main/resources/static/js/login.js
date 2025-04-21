// login.js - JavaScript cho trang đăng nhập

document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị/ẩn mật khẩu khi click vào icon mắt
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }

    // Xử lý đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy giá trị từ form
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Kiểm tra các trường đã được nhập chưa
            if (!username || !password) {
                showError('Vui lòng nhập đầy đủ thông tin đăng nhập');
                return;
            }
            
            // Trong thực tế, đây sẽ là API call đến server để xác thực
            // Nhưng trong demo này, chúng ta sẽ kiểm tra với dữ liệu mẫu
            attemptLogin(username, password, remember);
        });
    }

    // Xử lý quên mật khẩu
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chức năng khôi phục mật khẩu sẽ được triển khai sau.');
        });
    }

    // Kiểm tra nếu đã có thông tin đăng nhập được lưu trong localStorage
    checkSavedLogin();
});

// Hàm kiểm tra thông tin đăng nhập
function attemptLogin(username, password, remember) {
    // Tài khoản mẫu cho demo
    const demoUsers = [
        { username: 'admin', password: 'admin', role: 'admin' },
        { username: 'staff', password: 'staff', role: 'staff' },
        { username: 'manager', password: 'manager123', role: 'manager' }
    ];
    
    // Tìm tài khoản khớp với thông tin đăng nhập
    const user = demoUsers.find(user => 
        user.username === username && user.password === password);
    
    if (user) {
        // Đăng nhập thành công
        showSuccess();
        
        // Lưu thông tin đăng nhập nếu chọn "Ghi nhớ đăng nhập"
        if (remember) {
            saveLoginInfo(username, user.role);
        } else {
            // Xóa thông tin đăng nhập đã lưu trước đó (nếu có)
            clearSavedLogin();
        }
        
        // Chuyển hướng đến trang chủ sau 1 giây
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Đăng nhập thất bại
        showError('Tên đăng nhập hoặc mật khẩu không chính xác');
        
        // Xóa mật khẩu đã nhập
        document.getElementById('password').value = '';
        
        // Focus vào trường mật khẩu
        document.getElementById('password').focus();
    }
}

// Hiển thị thông báo lỗi
function showError(message) {
    const errorElement = document.getElementById('loginError');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Thêm hiệu ứng rung cho form
        const formContainer = document.querySelector('.login-form-container');
        formContainer.classList.add('shake');
        
        // Xóa hiệu ứng rung sau khi hoàn thành
        setTimeout(function() {
            formContainer.classList.remove('shake');
        }, 500);
    }
}

// Hiển thị thông báo thành công
function showSuccess() {
    const errorElement = document.getElementById('loginError');
    if (errorElement) {
        errorElement.textContent = 'Đăng nhập thành công! Đang chuyển hướng...';
        errorElement.style.display = 'block';
        errorElement.className = 'success-message';
    }
    
    // Thêm hiệu ứng thành công cho form
    const formContainer = document.querySelector('.login-form-container');
    formContainer.classList.add('success');
}

// Lưu thông tin đăng nhập vào localStorage
function saveLoginInfo(username, role) {
    const loginInfo = {
        username: username,
        role: role,
        timestamp: new Date().getTime()
    };
    
    localStorage.setItem('freshlandLoginInfo', JSON.stringify(loginInfo));
}

// Xóa thông tin đăng nhập đã lưu
function clearSavedLogin() {
    localStorage.removeItem('freshlandLoginInfo');
}

// Kiểm tra thông tin đăng nhập đã lưu
function checkSavedLogin() {
    const savedLogin = localStorage.getItem('freshlandLoginInfo');
    
    if (savedLogin) {
        try {
            const loginInfo = JSON.parse(savedLogin);
            
            // Kiểm tra xem thông tin đăng nhập có còn hiệu lực không (30 ngày)
            const currentTime = new Date().getTime();
            const loginTime = loginInfo.timestamp;
            const daysPassed = (currentTime - loginTime) / (1000 * 60 * 60 * 24);
            
            if (daysPassed < 30) {
                // Điền thông tin vào form
                document.getElementById('username').value = loginInfo.username;
                document.getElementById('remember').checked = true;
                
                // Focus vào trường mật khẩu
                document.getElementById('password').focus();
            } else {
                // Xóa thông tin đăng nhập đã hết hạn
                clearSavedLogin();
            }
        } catch (error) {
            console.error('Lỗi khi đọc thông tin đăng nhập:', error);
            clearSavedLogin();
        }
    }
}

// Hàm đăng xuất (có thể được gọi từ các trang khác)
function logout() {
    // Xóa thông tin phiên đăng nhập
    // Trong thực tế, có thể cần gọi API để đăng xuất phiên từ server
    
    // Xóa thông tin đăng nhập tự động (nếu không chọn "Ghi nhớ đăng nhập")
    const savedLogin = localStorage.getItem('freshlandLoginInfo');
    if (savedLogin) {
        const loginInfo = JSON.parse(savedLogin);
        const keepLogin = confirm('Bạn có muốn giữ thông tin đăng nhập cho lần sau không?');
        
        if (!keepLogin) {
            clearSavedLogin();
        }
    }
    
    // Chuyển hướng về trang đăng nhập
    window.location.href = 'login.html';
}