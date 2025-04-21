package com.freshland.freshland.controller;

import com.freshland.freshland.model.Product;
import com.freshland.freshland.service.CategoryService;
import com.freshland.freshland.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;

    // Constructor Injection
    @Autowired
    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/product")
    public String Index(Model model){
        model.addAttribute("product", productService.getAllProducts());
        model.addAttribute("category", categoryService.getAllCategory());
        return "product/products";
    }

    @GetMapping("/product/update")
    public String Create() {
        return "product/update";
    }

    @GetMapping("/product/update/{id}")
    public String updateProduct(@PathVariable Long id, Model model) {
        model.addAttribute("id", id);
        return "product/update";
    }

    @GetMapping("/category/{categoryId}")
    public String getByCategory(@PathVariable Integer categoryId, Model model) {
        List<Product> products = productService.getProductsByCategoryId(categoryId);
        model.addAttribute("products", products);
        return "products"; // Trả về trang products.html
    }


}
