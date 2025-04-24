package com.freshland.freshland.service;

import com.freshland.freshland.model.User;
import com.freshland.freshland.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public User getUserOrNull(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User không được null");
        }

        if (user.getId() != null) { // Update
            if (user.getPassword() != null) {
                user.setPassword(encodePassword(user.getPassword()));
            } else {
                User existingUser = getUserOrNull(user.getId());
                if (existingUser == null) {
                    throw new RuntimeException("Không tìm thấy user với ID: " + user.getId());
                }
                user.setPassword(existingUser.getPassword());
            }
        } else { // Create mới
            if (user.getPassword() == null) {
                throw new IllegalArgumentException("Mật khẩu không được để trống khi tạo tài khoản mới");
            }
            user.setPassword(encodePassword(user.getPassword()));
        }

        return userRepository.save(user);
    }


    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // Nếu muốn lọc theo status:
    public List<User> getUsersByStatus(Boolean status) {
        return userRepository.findByStatus(status);
    }

    // Mã hóa mật khẩu khi tạo mới hoặc cập nhật
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // Kiểm tra mật khẩu nhập vào có đúng với mật khẩu đã lưu hay không
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // Ví dụ: Xác thực đăng nhập
    public boolean login(String username, String password) {
        User user = userRepository.findByStatusAndUsername(true,username);
        if (user == null) return false;
        return checkPassword(password, user.getPassword());
    }
}

