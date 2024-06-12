-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th6 11, 2024 lúc 01:01 AM
-- Phiên bản máy phục vụ: 8.0.31
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `famework1`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `cateId` int NOT NULL,
  `cateName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`cateId`, `cateName`, `createdAt`, `updatedAt`) VALUES
(13, 'Nước trái cây', '2024-06-11 00:07:41', '2024-06-11 00:07:41'),
(14, 'Snack', '2024-06-11 00:07:41', '2024-06-11 00:07:41'),
(15, 'Đồ gia dụng', '2024-06-11 00:07:41', '2024-06-11 00:07:41'),
(16, 'Bia', '2024-06-11 00:07:41', '2024-06-11 00:07:41'),
(17, 'Kẹo', '2024-06-11 00:07:41', '2024-06-11 00:07:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `commentsId` int NOT NULL,
  `userName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `commentsEmail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `productName` text COLLATE utf8mb4_general_ci NOT NULL,
  `imageUrl` text COLLATE utf8mb4_general_ci NOT NULL,
  `commentsContent` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`commentsId`, `userName`, `commentsEmail`, `productName`, `imageUrl`, `commentsContent`, `createdAt`, `updatedAt`) VALUES
(2, 'Hoàng Phi', 'phideptroai337@gmail.com', 'Bia Larue', 'https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8934822404338-1.jpg.webp', 'rttrrt', '2024-06-10 18:26:13', '2024-06-10 18:26:13'),
(3, 'Hoàng Phi', 'phi@gmail.com', 'Bia Larue', 'https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8934822404338-1.jpg.webp', 'Sản phẩm chất lượng vừa túi tiền', '2024-06-11 00:09:49', '2024-06-11 00:09:49'),
(4, 'Kim Đang', 'dang@gmail.com', 'Nước lau sàn', 'https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8934868172727-1.jpg.webp', '10 điểm 10 điểm', '2024-06-11 00:09:49', '2024-06-11 00:09:49'),
(5, 'Khiêm', 'khiem@gmail.com', 'Sửa vinamilk', 'https://www.vinamilk.com.vn/sua-tuoi-vinamilk/wp-content/themes/suanuoc/tpl/trang-chu/images/img_1-mb.jpg', 'Sửa rất là ngon lun', '2024-06-11 00:09:49', '2024-06-11 00:09:49'),
(6, 'Diễm Ái', 'ai@gmail.com', 'Sửa tắm clear', 'https://cf.shopee.vn/file/cf4f2c6cd1b13728f3a99328fb28677a', 'Sửa tắm thơm quá trời, nên mua', '2024-06-11 00:09:49', '2024-06-11 00:09:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `orderID` int NOT NULL,
  `client` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `valueOrder` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `payment` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`orderID`, `client`, `quantity`, `date`, `valueOrder`, `payment`, `createdAt`, `updatedAt`) VALUES
(1, 'Hoàng Phi', 3, '30/04/2024', 'char', '444', '2024-06-11 00:44:27', '2024-06-11 00:44:27'),
(2, 'Đang', 3, '30/04/2024', 'Sửa tắm', '404', '2024-06-11 00:44:27', '2024-06-11 00:44:27'),
(3, 'Khiem', 5, '16/06/2025', 'char', '400000', '2024-06-11 00:57:45', '2024-06-11 00:57:45'),
(4, 'Kim Đang', 56, '16/06/2023', 'char', '450000', '2024-06-11 00:57:45', '2024-06-11 00:57:45'),
(5, 'Diễm Ái', 65, '12/02/2022', 'char', '546000', '2024-06-11 00:57:45', '2024-06-11 00:57:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `productID` int NOT NULL,
  `productType` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `productName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `productImage` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `productPrice` int NOT NULL,
  `expiryDate` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL,
  `cateID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`productID`, `productType`, `productName`, `productImage`, `productPrice`, `expiryDate`, `quantity`, `cateID`, `createdAt`, `updatedAt`) VALUES
(12, 'Xuất bán', 'Bia Larue', 'https://cf.shopee.vn/file/99dbd93390e90b3622130de0f3abc7c1', 340000, '15/06/2026', 50, 16, '2024-06-11 00:38:26', '2024-06-11 00:38:26'),
(13, 'Xuất bán', 'Sửa tắm clear', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ3ARtlpjZyKr4jTE1VNytg8amVH6GUHy6pNt4gsUICr2MFHzZwnuGlZP7otIKFZpIYG1vnfWHFUYU-Y3obDHtMkUAGstYtM17GK5VWA6Fr97xEBFtPyIK-1vgukkfz5wMYiPAOf3OB&usqp=CAc', 195000, '30/06/2025', 100, 15, '2024-06-11 00:38:26', '2024-06-11 00:38:26'),
(14, 'Xuất bán', 'Dầu gội đầu clear', 'https://prod-cdn.pharmacity.io/e-com/images/ecommerce/P07038_1.jpg', 190000, '2027', 5, 15, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(15, 'Xuất bán', 'Nước nha đam', 'https://daivietfood.com/wp-content/uploads/2021/04/NuocYenNhaDam-3-1.png', 15000, '2027', 300, 13, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(16, 'Xuất bán', 'Kẹo chupachup', 'https://m.media-amazon.com/images/I/51HqYzdY3pL._SS400_.jpg', 1000, '16/07/2020', 500, 17, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(17, 'Xuất bán', 'Snack bí đỏ', 'https://cdn.tgdd.vn/Products/Images/3364/79708/bhx/snack-bi-do-vi-bo-nuong-oishi-goi-39g-202205171429476674.jpg', 5000, '25/06/2026', 5000, 14, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(18, 'Xuất bán', 'Snack poka', 'https://pvmarthanoi.com.vn/wp-content/uploads/2023/06/10.jpg', 5000, '20/05/2026', 450, 14, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(19, 'Xuất bán', 'Nước cam vắt', 'https://diemdungchandongthap.com/wp-content/uploads/2021/06/cam-ep-1.jpg', 10000, '12/12/2025', 460, 13, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(20, 'Xuất bán', 'Bia tiger', 'https://storage.googleapis.com/teko-gae.appspot.com/media/image/2021/7/5/20210705_f375fdf5-09be-480a-aef6-2b9e0d97f062.jpg', 340000, '27/07/2027', 16, 16, '2024-06-11 00:46:17', '2024-06-11 00:46:17'),
(21, 'Xuất bán', 'Socola vị trái cây', 'https://shechocolate.com.vn/wp-content/uploads/2022/06/Trai-cay-nhung-socola.png', 35000, '27/07/2026', 30, 17, '2024-06-11 00:46:17', '2024-06-11 00:46:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `userName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `userEmail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `userPhone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `userAddress` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`userId`, `userName`, `password`, `userEmail`, `userPhone`, `userAddress`, `createdAt`, `updatedAt`) VALUES
(1, 'Hoàng Phi', 'hoangphi123', 'phideptroai337@gmail.com', '0702912140', 'Tân Hòa c, Long Hưng, Mỹ Tú, Sóc Trăng', '2024-06-10 11:45:21', '2024-06-10 11:45:21'),
(3, 'Kim Đang', 'dang12345', 'dang@gmail.com', '0798123412', 'An Khánh, Ninh kiều, Cần Thơ', '2024-06-11 00:22:40', '2024-06-11 00:22:40'),
(4, 'Khiêm', 'khiem123', 'khiem@gmail.com', '0702343455', 'Phú Thứ, Cái Răng', '2024-06-11 00:22:40', '2024-06-11 00:22:40'),
(5, 'Diễm Ái\r\n', 'ai1234567', 'ai@gmail.com', '0702345643', 'Ninh Kiều, Cần Thơ', '2024-06-11 00:36:50', '2024-06-11 00:36:50');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cateId`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentsId`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `cateID` (`cateID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `cateId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `commentsId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `productID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cateID`) REFERENCES `categories` (`cateId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
