package com.freshland.freshland.service;

import com.freshland.freshland.dot.ProductSalesInfo;
import com.freshland.freshland.model.Product;
import com.freshland.freshland.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProductOrNull(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll(Sort.by(Sort.Order.desc("updatedAt")));
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        if (product.getQuantity() > 10) {
            product.setStatus("In stock");
        } else if (product.getQuantity() <= 10 && product.getQuantity() > 0) {
            product.setStatus("Low stock");
        } else {
            product.setStatus("Out of stock");
        }
        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
    public List<Product> getProductsByCategoryId(Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getProductsByStatus(String status) {
        return productRepository.findByStatus(status);
    }

    public List<Product> getProductsByCategoryIdAndStatus(Integer categoryId, String status) {
        return productRepository.findByCategoryIdAndStatus(categoryId, status);
    }

    public Long countproduct(){
        return productRepository.count();
    }

    public Long countLowStock(){
        return productRepository.countByStatus("Low stock");
    }

    public List<ProductSalesInfo> TopSeller(){
        return productRepository.findTop10BestSellingProductsWithSales();
    }

}
