package com.freshland.freshland.controller;

import com.freshland.freshland.model.Product;
import com.freshland.freshland.service.CategoryService;
import com.freshland.freshland.service.FileService;
import com.freshland.freshland.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Controller
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;
    private final FileService fileService;

    @Autowired
    public ProductController(ProductService productService, CategoryService categoryService, FileService fileService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.fileService = fileService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/product")
    public String Index(Model model){
        model.addAttribute("product", productService.getAllProducts());
        model.addAttribute("category", categoryService.getAllCategory());
        return "product/products";
    }

    @PostMapping("/GetProduct")
    @ResponseBody
    public Map<String, List<?>> product(){
        Map<String,List<?>> result = new HashMap<>();
        result.put("product", productService.getAllProducts());
        result.put("category",categoryService.getAllCategory());
        return result;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/product/update")
    public String Create(Model model) {
        model.addAttribute("product", new Product());
        model.addAttribute("category", categoryService.getAllCategory());
        return "product/update";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/product/update/{id}")
    public String updateProduct(@PathVariable Integer id, Model model) {
        model.addAttribute("product", productService.getProductOrNull(id));
        model.addAttribute("category", categoryService.getAllCategory());
        return "product/update";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/product/delete/{id}")
    public String deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return "redirect:/product";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/SaveProduct")
    public String saveProduct(@ModelAttribute Product product,
                              @RequestParam("imageFile") MultipartFile imageFile) {
        if (!imageFile.isEmpty()) {
            String fileName = fileService.saveFile(imageFile);
            product.setImageUrl("/uploads/" + fileName);
        } else if (product.getId() != null) {
            Product existing = productService.getProductOrNull(product.getId());
            product.setImageUrl(existing.getImageUrl());
        }
        productService.saveProduct(product);
        return "redirect:/product";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/category/{categoryId}")
    public String getByCategory(@PathVariable Integer categoryId, Model model) {
        List<Product> products = productService.getProductsByCategoryId(categoryId);
        model.addAttribute("products", products);
        return "products";
    }


}
