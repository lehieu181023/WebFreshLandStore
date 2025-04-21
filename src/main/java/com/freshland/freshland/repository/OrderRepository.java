package com.freshland.freshland.repository;

import com.freshland.freshland.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}