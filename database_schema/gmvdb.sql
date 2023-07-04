-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th8 13, 2021 lúc 11:28 PM
-- Phiên bản máy phục vụ: 8.0.23
-- Phiên bản PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `gmvdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `main_category_id` int NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `main_category_id`, `create_at`, `update_at`) VALUES
(4, 'string', 1, '2021-08-04 15:00:28', '2021-08-04 15:00:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company_profile`
--

CREATE TABLE `company_profile` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `basic_information` varchar(1000) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `zalo` varchar(255) NOT NULL,
  `url_image` varchar(100) NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hot_product`
--

CREATE TABLE `hot_product` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inquiry`
--

CREATE TABLE `inquiry` (
  `id` int NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `product_name` varchar(255) NOT NULL,
  `product_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `main_category`
--

CREATE TABLE `main_category` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url_image` varchar(100) NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `main_category`
--

INSERT INTO `main_category` (`id`, `name`, `description`, `url_image`, `create_at`, `update_at`) VALUES
(1, 'fashion', 'fashion', 'null', '2021-08-04 10:22:32', '2021-08-04 10:22:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post`
--

CREATE TABLE `post` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category_id` int NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `post`
--

INSERT INTO `post` (`id`, `title`, `image`, `description`, `content`, `category_id`, `create_at`, `update_at`) VALUES
(5, 'string', 'string', 'string', 'string', 4, '2021-08-04 17:10:26', '2021-08-04 17:10:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `model_number` varchar(20) NOT NULL,
  `main_image_url` varchar(100) NOT NULL,
  `price` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `size` varchar(50) NOT NULL,
  `category_id` int NOT NULL,
  `slug` varchar(255) NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `model_number`, `main_image_url`, `price`, `material`, `size`, `category_id`, `slug`, `create_at`, `update_at`) VALUES
(8, 'sng', 'string', 'sng', 'https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/bn_cate_3.jpg?1625838708146', 'string', 'string', 'string', 4, '', '2021-08-04 15:41:06', '2021-08-04 15:41:06'),
(11, 'chair', 'chair', 'chair', 'https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/bn_cate_3.jpg?1625838708146', 'string', 'string', 'string', 4, '', '2021-08-10 22:53:48', '2021-08-10 22:53:48'),
(12, 'picture', 'chair', 'picture', 'https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/bn_cate_3.jpg?1625838708146', 'string', 'string', 'string', 4, '', '2021-08-10 22:54:07', '2021-08-10 22:54:07'),
(13, 'string dadads', 'string', 'stringmm   mmm', 'string', 'string', 'string', 'string', 4, 'string_dadads1628662949232', '2021-08-11 13:22:29', '2021-08-11 13:22:29'),
(14, 'stri mmmm', 'string', 'stringfff  mmm', 'string', 'string', 'string', 'string', 4, 'stri_mmmm1628662966018', '2021-08-11 13:22:46', '2021-08-11 13:22:46'),
(15, 'stri ali mdnd saldd', 'string', 'strin  mmm', 'string', 'string', 'string', 'string', 4, 'stri_ali_mdnd_saldd_1628663180814', '2021-08-11 13:26:20', '2021-08-11 13:26:20'),
(16, 'string perfect vkl', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vkl_1628663328700', '2021-08-11 13:28:48', '2021-08-11 13:28:48'),
(22, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663416981', '2021-08-11 13:30:16', '2021-08-11 13:30:16'),
(23, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663417799', '2021-08-11 13:30:17', '2021-08-11 13:30:17'),
(24, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663418399', '2021-08-11 13:30:18', '2021-08-11 13:30:18'),
(25, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663418685', '2021-08-11 13:30:18', '2021-08-11 13:30:18'),
(26, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663419156', '2021-08-11 13:30:19', '2021-08-11 13:30:19'),
(27, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663419386', '2021-08-11 13:30:19', '2021-08-11 13:30:19'),
(28, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663419618', '2021-08-11 13:30:19', '2021-08-11 13:30:19'),
(29, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663419908', '2021-08-11 13:30:19', '2021-08-11 13:30:19'),
(30, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663420684', '2021-08-11 13:30:20', '2021-08-11 13:30:20'),
(31, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663421480', '2021-08-11 13:30:21', '2021-08-11 13:30:21'),
(32, 'string perfect vklssss', 'string', 'string ml', 'string', 'string', 'string', 'string', 4, 'string_perfect_vklssss_1628663422334', '2021-08-11 13:30:22', '2021-08-11 13:30:22'),
(34, 'string', 'string', 'string', 'string', 'string', 'alo', 'string', 4, 'string_1628772375702', '2021-08-12 19:46:15', '2021-08-12 19:46:15'),
(35, 'Model', 'Model elerrr', 'string', 'string', 'string', 'string', 'string', 4, 'Model_1628868292298', '2021-08-13 22:24:52', '2021-08-13 22:24:52'),
(36, 'Model', 'Model elerrr', 'string', 'string', 'string', 'string', 'string', 4, 'Model_1628868414344', '2021-08-13 22:26:54', '2021-08-13 22:26:54'),
(37, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 4, 'string_1628870806870', '2021-08-13 23:06:46', '2021-08-13 23:06:46'),
(38, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 4, 'string_1628871101513', '2021-08-13 23:11:41', '2021-08-13 23:11:41'),
(39, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 4, 'string_1628871104013', '2021-08-13 23:11:44', '2021-08-13 23:11:44'),
(40, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 4, 'string_1628871116071', '2021-08-13 23:11:56', '2021-08-13 23:11:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `url_image1` varchar(100) NOT NULL,
  `url_image2` varchar(100) NOT NULL,
  `url_image3` varchar(100) NOT NULL,
  `url_image4` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `url_image1`, `url_image2`, `url_image3`, `url_image4`) VALUES
(1, 8, 'sa', 'sda', 'da', 'dad');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`) VALUES
(26, 'string', 'string', '$2a$08$/e8XtxaU7aJreEcKeWaTQuQZHt331BOswhUAoExPSdX4Z2c7pXpV.', 1),
(27, 'string1', 'string12', '$2a$08$SFpaWvNnaY9vuIXJ1VpTjO2KyDUOIRGSZbNry4THA16FUNqGKcLgW', 0),
(28, 'van', 'van', '$2a$08$SSihlIaELO8ZZt6iN6n34es25JwJjx8dgdfTAwLQ/lbLTTpDxj4jq', 0),
(29, 'string123', 'string123', '$2a$08$u.84KIdxtgMCJnxuXARyQ..CZ.LM2FGRD7OstUZeM6inF8tWW5Ahu', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `main_catergory_id` (`main_category_id`);

--
-- Chỉ mục cho bảng `company_profile`
--
ALTER TABLE `company_profile`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `hot_product`
--
ALTER TABLE `hot_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `inquiry`
--
ALTER TABLE `inquiry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `main_category`
--
ALTER TABLE `main_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `catergory_id` (`category_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `catergory_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `company_profile`
--
ALTER TABLE `company_profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hot_product`
--
ALTER TABLE `hot_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `inquiry`
--
ALTER TABLE `inquiry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT cho bảng `main_category`
--
ALTER TABLE `main_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`main_category_id`) REFERENCES `main_category` (`id`);

--
-- Các ràng buộc cho bảng `hot_product`
--
ALTER TABLE `hot_product`
  ADD CONSTRAINT `hot_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `inquiry`
--
ALTER TABLE `inquiry`
  ADD CONSTRAINT `inquiry_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
