package com.freshland.freshland.repository;

import com.freshland.freshland.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(value = "SELECT SUM(total_amount) FROM `orders` WHERE DATE(order_date) = CURRENT_DATE",nativeQuery = true)
    Long TotalAmountToday();

    @Query(value = "SELECT COUNT(*) FROM `orders` WHERE DATE(order_date) = CURRENT_DATE ",nativeQuery = true)
    Long countOrderToday();

    List<Order> findTop4ByOrderByOrderDateDesc();
}