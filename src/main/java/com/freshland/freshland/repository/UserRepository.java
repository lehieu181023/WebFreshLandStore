package com.freshland.freshland.repository;

import com.freshland.freshland.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByStatus(Boolean status);
    User findByStatusAndUsername(Boolean status, String username);
    Optional<User> findByUsername(String username);
}
