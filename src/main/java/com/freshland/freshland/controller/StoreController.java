package com.freshland.freshland.controller;

import com.freshland.freshland.model.CustomUserDetails;
import com.freshland.freshland.model.Order;
import com.freshland.freshland.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class StoreController {

    private final OrderService orderService;

    public StoreController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/store")
    public String Index(){
        return "order";
    }

    @PostMapping("/CreateOrder")
    public String AddOrder(@RequestParam("id") String id, @RequestParam("quantity") String quantity, @AuthenticationPrincipal CustomUserDetails userDetails, HttpServletRequest request, Model model){
        Order order = orderService.addOrder(userDetails.getId(),id,quantity);
        model.addAttribute("UrlReferer",request.getHeader("Referer"));
        model.addAttribute("order",orderService.getOrderOrNull(order.getId()));
        return "order/PrintOrder";
    }
}
