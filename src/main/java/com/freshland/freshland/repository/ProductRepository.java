package com.freshland.freshland.repository;

import com.freshland.freshland.dot.ProductSalesInfo;
import com.freshland.freshland.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
  List<Product> findByCategoryId(Integer categoryId);
  List<Product> findByStatus(String status);

  List<Product> findByCategoryIdAndStatus(Integer categoryId, String status); // optional nếu cần lọc kết hợp

  Long countByStatus( String status);

  @Query(value = """
    SELECT p.id AS id, p.name AS name,p.image_url AS imageUrl, SUM(od.quantity * od.price) AS totalSold ,SUM(od.quantity) AS CountSold\s
        FROM products p
        JOIN order_items od ON p.id = od.product_id
        GROUP BY p.id, p.name
    ORDER BY `CountSold` DESC LIMIT 10
    """, nativeQuery = true)
  List<ProductSalesInfo> findTop10BestSellingProductsWithSales();

}
