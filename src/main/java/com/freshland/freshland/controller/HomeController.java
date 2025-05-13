package com.freshland.freshland.controller;

import com.freshland.freshland.service.OrderService;
import com.freshland.freshland.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final ProductService productService;
    private final OrderService orderService;

    public HomeController(ProductService productService, OrderService orderService) {
        this.productService = productService;
        this.orderService = orderService;
    }

    @GetMapping("/home")
    public String Index(Model model){
        model.addAttribute("countProduct",productService.countproduct());
        model.addAttribute("LowStockProduct",productService.countLowStock());
        model.addAttribute("OrderToday",orderService.CountOrderToday());
        model.addAttribute("TopProduct",productService.TopSeller());
        model.addAttribute("orderRecent",orderService.OrderRecent());
        model.addAttribute("TotalAmount",orderService.TotalToday());
        return "index";
    }

}
