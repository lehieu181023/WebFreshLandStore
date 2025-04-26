package com.freshland.freshland.controller;

import com.freshland.freshland.model.CustomUserDetails;
import com.freshland.freshland.model.Order;
import com.freshland.freshland.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.format.DateTimeFormatter;

@Controller
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/order")
    public String Index(Model model){
        model.addAttribute("order",orderService.getAllOrders());
        return "order/listorders";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/orderdetail/{id}")
    public String OrderDetail(@PathVariable Integer id,Model model){
        Order order = orderService.getOrderOrNull(id);
        model.addAttribute("order",orderService.getOrderOrNull(id));
        return "order/orderdetail";
    }

    @GetMapping("/printorder/{id}")
    public String PrinOrder(@PathVariable Integer id, Model model, HttpServletRequest request){
        Order order = orderService.getOrderOrNull(id);
        model.addAttribute("UrlReferer",request.getHeader("Referer"));
        model.addAttribute("order",order);
        return "order/PrintOrder";
    }
}
