package com.freshland.freshland.repository;

import com.freshland.freshland.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
  List<Product> findByCategoryId(Integer categoryId);
  List<Product> findByStatus(String status);
  List<Product> findByCategoryIdAndStatus(Integer categoryId, String status); // optional nếu cần lọc kết hợp
}
