package com.freshland.freshland.service;

import com.freshland.freshland.model.Category;
import com.freshland.freshland.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getOrderById(Integer id) {
        return categoryRepository.findById(id);
    }

    public Category saveCategory(Category order) {
        return categoryRepository.save(order);
    }

    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}
