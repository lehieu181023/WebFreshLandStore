package com.freshland.freshland.service;

import com.freshland.freshland.model.Order;
import com.freshland.freshland.model.OrderItem;
import com.freshland.freshland.model.Product;
import com.freshland.freshland.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final OrderItemService orderItemService;
    private final UserService userService;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductService productService, OrderItemService orderItemService, UserService userService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.orderItemService = orderItemService;
        this.userService = userService;
    }



    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    @Transactional
    public Order addOrder(Integer userId, String productIds, String quantities) {
        // Parse product IDs and quantities
        String[] productIdArray = productIds.split(",");
        String[] quantityArray = quantities.split(",");

        // Validate input
        if (productIdArray.length != quantityArray.length) {
            throw new IllegalArgumentException("Product IDs and quantities arrays must be the same length");
        }

        // Create new order
        Order order = new Order();
        order.setUserId(userId);
        order.setUser(userService.getUserOrNull(userId));
        order.setOrderDate(LocalDateTime.now());
        // Calculate total amount and create order items
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (int i = 0; i < productIdArray.length; i++) {
            Integer productId = Integer.parseInt(productIdArray[i].trim());
            Integer quantity = Integer.parseInt(quantityArray[i].trim());

            // Fetch product
            Product product = productService.getProductOrNull(productId);
            if (product == null) {
                throw new IllegalArgumentException("Product with ID " + productId + " not found");
            }

            // Check if quantity is valid
            if (quantity <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than zero for product ID " + productId);
            }

            // Check if there's enough stock
            if (product.getQuantity() < quantity) {
                throw new IllegalArgumentException("Not enough stock for product ID " + productId +
                        ". Available: " + product.getQuantity());
            }

            // Calculate price for this item
            BigDecimal itemPrice = product.getPrice().multiply(BigDecimal.valueOf(quantity));
            totalAmount = totalAmount.add(itemPrice);

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(productId);
            orderItem.setProduct(productService.getProductOrNull(productId));
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());
            orderItem.setCreatedAt(LocalDateTime.now());
            orderItem.setUpdatedAt(LocalDateTime.now());

            orderItems.add(orderItem);

            // Update product quantity
            product.setQuantity(product.getQuantity() - quantity);
            productService.saveProduct(product);
        }

        // Set total amount and save order
        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

        // Set order ID in each order item and save them
        for (OrderItem item : orderItems) {
            item.setOrderId(savedOrder.getId());
            orderItemService.saveOrderItem(item);
        }

        // Set order items in order object
        savedOrder.setOrderItem(orderItems);

        return savedOrder;
    }

    public Long TotalToday(){
        return orderRepository.TotalAmountToday();
    }

    public Long CountOrderToday(){
        return orderRepository.countOrderToday();
    }

    public List<Order> OrderRecent(){
        return orderRepository.findTop4ByOrderByOrderDateDesc();
    }

    public Order getOrderOrNull(Integer id) {
        return orderRepository.findById(id).orElse(null);
    }

}

