-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 27, 2025 lúc 12:55 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `freshland_store`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Fruits', 'Fresh fruits from local farmers', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(2, 'Vegetables', 'Organic vegetables for your healthy diet', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(3, 'Dairy', 'Milk, cheese, yogurt and other dairy products', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(4, 'Bakery', 'Fresh bread, pastries and cakes', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(5, 'Beverages', 'Soft drinks, juices, coffee and tea', '2025-04-15 02:16:34', '2025-04-15 02:16:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(38,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `total_amount`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-04-25 02:49:14', 10000.00, '2025-04-25 02:49:14', '2025-04-25 02:49:14'),
(2, 1, '2025-04-25 02:50:15', 5005.98, '2025-04-25 02:50:15', '2025-04-25 02:50:15'),
(3, 1, '2025-04-25 02:58:59', 10000.00, '2025-04-25 02:58:59', '2025-04-25 02:58:59'),
(4, 1, '2025-04-25 03:01:11', 10000.00, '2025-04-25 03:01:11', '2025-04-25 03:01:11'),
(5, 1, '2025-04-25 03:03:10', 10000.00, '2025-04-25 03:03:10', '2025-04-25 03:03:10'),
(6, 1, '2025-04-25 10:49:10', 10000.00, '2025-04-25 10:49:10', '2025-04-25 10:49:10'),
(7, 1, '2025-04-25 13:56:32', 10000.00, '2025-04-25 13:56:32', '2025-04-25 13:56:32'),
(8, 1, '2025-04-26 21:15:59', 15000.00, '2025-04-26 21:15:59', '2025-04-26 21:15:59'),
(9, 1, '2025-04-26 21:24:08', 10000.00, '2025-04-26 21:24:08', '2025-04-26 21:24:08'),
(10, 1, '2025-04-26 22:14:43', 10000.00, '2025-04-26 22:14:43', '2025-04-26 22:14:43'),
(11, 1, '2025-04-26 22:16:11', 10000.00, '2025-04-26 22:16:11', '2025-04-26 22:16:11'),
(12, 1, '2025-04-26 22:17:01', 5000.00, '2025-04-26 22:17:01', '2025-04-26 22:17:01'),
(13, 1, '2025-04-26 22:28:51', 5000.00, '2025-04-26 22:28:51', '2025-04-26 22:28:51'),
(14, 1, '2025-04-26 22:31:05', 10000.00, '2025-04-26 22:31:05', '2025-04-26 22:31:05'),
(15, 1, '2025-04-26 22:32:37', 10000.00, '2025-04-26 22:32:37', '2025-04-26 22:32:37'),
(16, 2, '2025-04-26 22:46:34', 10000.00, '2025-04-26 22:46:34', '2025-04-26 22:46:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 11, 1, 5000.00, 1, '2025-04-25 02:49:14', '2025-04-25 02:49:14'),
(2, 1, 12, 1, 5000.00, 1, '2025-04-25 02:49:14', '2025-04-25 02:49:14'),
(3, 2, 2, 1, 2.49, 1, '2025-04-25 02:50:14', '2025-04-25 02:50:14'),
(4, 2, 12, 1, 5000.00, 1, '2025-04-25 02:50:14', '2025-04-25 02:50:14'),
(5, 2, 7, 1, 3.49, 1, '2025-04-25 02:50:14', '2025-04-25 02:50:14'),
(6, 3, 12, 1, 5000.00, 1, '2025-04-25 02:58:59', '2025-04-25 02:58:59'),
(7, 3, 11, 1, 5000.00, 1, '2025-04-25 02:58:59', '2025-04-25 02:58:59'),
(8, 4, 11, 1, 5000.00, 1, '2025-04-25 03:01:11', '2025-04-25 03:01:11'),
(9, 4, 12, 1, 5000.00, 1, '2025-04-25 03:01:11', '2025-04-25 03:01:11'),
(10, 5, 11, 1, 5000.00, 1, '2025-04-25 03:03:10', '2025-04-25 03:03:10'),
(11, 5, 12, 1, 5000.00, 1, '2025-04-25 03:03:10', '2025-04-25 03:03:10'),
(12, 6, 12, 1, 5000.00, 1, '2025-04-25 10:49:10', '2025-04-25 10:49:10'),
(13, 6, 11, 1, 5000.00, 1, '2025-04-25 10:49:10', '2025-04-25 10:49:10'),
(14, 7, 12, 1, 5000.00, 1, '2025-04-25 13:56:32', '2025-04-25 13:56:32'),
(15, 7, 11, 1, 5000.00, 1, '2025-04-25 13:56:32', '2025-04-25 13:56:32'),
(16, 8, 11, 3, 5000.00, 1, '2025-04-26 21:15:59', '2025-04-26 21:15:59'),
(17, 9, 12, 2, 5000.00, 1, '2025-04-26 21:24:08', '2025-04-26 21:24:08'),
(18, 10, 11, 2, 5000.00, 1, '2025-04-26 22:14:43', '2025-04-26 22:14:43'),
(19, 11, 12, 2, 5000.00, 1, '2025-04-26 22:16:11', '2025-04-26 22:16:11'),
(20, 12, 12, 1, 5000.00, 1, '2025-04-26 22:17:01', '2025-04-26 22:17:01'),
(21, 13, 12, 1, 5000.00, 1, '2025-04-26 22:28:51', '2025-04-26 22:28:51'),
(22, 14, 12, 1, 5000.00, 1, '2025-04-26 22:31:05', '2025-04-26 22:31:05'),
(23, 14, 11, 1, 5000.00, 1, '2025-04-26 22:31:05', '2025-04-26 22:31:05'),
(24, 15, 12, 1, 5000.00, 1, '2025-04-26 22:32:37', '2025-04-26 22:32:37'),
(25, 15, 11, 1, 5000.00, 1, '2025-04-26 22:32:37', '2025-04-26 22:32:37'),
(26, 16, 11, 1, 5000.00, 1, '2025-04-26 22:46:34', '2025-04-26 22:46:34'),
(27, 16, 12, 1, 5000.00, 1, '2025-04-26 22:46:34', '2025-04-26 22:46:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` enum('In stock','Out of stock','Low stock') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `quantity`, `category_id`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Organic Bananas', 2.49, 44, 1, '/images/products/banana.jpg', 'In stock', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(3, 'Organic Carrots', 1.99, 60, 2, '/images/products/carrot.jpg', 'In stock', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(4, 'Organic Tomatoes', 2.99, 40, 2, '/images/products/tomato.jpg', 'Out of stock', '2025-04-15 02:16:34', '2025-04-21 07:26:23'),
(5, 'Organic Milk', 4.49, 30, 3, '/images/products/milk.jpg', 'In stock', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(6, 'Organic Cheddar Cheese', 5.99, 25, 3, '/images/products/cheese.jpg', 'Low stock', '2025-04-15 02:16:34', '2025-04-21 07:31:47'),
(7, 'Whole Grain Bread', 3.49, 19, 4, '/images/products/bread.jpg', 'In stock', '2025-04-15 02:16:34', '2025-04-15 02:16:34'),
(11, 'Bim bim bí ngô', 5000.00, 86, 1, '/uploads/6168288f-97c2-4072-94e5-c901f0b40ff9.jpg', 'In stock', '2025-04-23 00:43:20', '2025-04-23 02:06:49'),
(12, 'Bim bim bí ngô', 5000.00, 84, 1, '/uploads/dd657b74-41df-4a6d-beda-546688273e07.jpg', 'In stock', '2025-04-23 01:04:16', '2025-04-23 02:06:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `Phone` varchar(13) DEFAULT NULL,
  `role` enum('ADMIN','STAFF') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `email`, `Phone`, `role`, `created_at`, `updated_at`, `status`) VALUES
(1, 'admin', '$2a$10$WZwGwr9jJ2lr0rnPwD9lReZBT6Bw35sJcZ8x/WBQOdDfm5zD4r9r6', 'Admin User', 'admin@freshland.com', '0397790753', 'ADMIN', '2025-04-15 02:16:34', '2025-04-23 22:45:12', b'1'),
(2, 'staff', '$2a$10$qxbdUzTfgYPPwHrAzvsr/OOIqiP261DqC6R6k6R2YmBiXPa34QeRW', 'Staff User', 'staff@freshland.com', '0397790752', 'STAFF', '2025-04-15 02:16:34', '2025-04-26 22:39:44', b'1');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
