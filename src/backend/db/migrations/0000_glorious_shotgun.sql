CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(36) NOT NULL,
	`product_id` varchar(36),
	`user_id` varchar(36),
	`shipping_address` varchar(255),
	`quantity` int,
	`total_price` decimal(10,2),
	`status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
	`ordered_at` timestamp DEFAULT (now()),
	`shipped_at` timestamp,
	`delivered_at` timestamp,
	`cancelled_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255),
	`description` text,
	`price` decimal(10,2) DEFAULT '0.00',
	`quantity` int DEFAULT 0,
	`three_d_image` text,
	`status` enum('active','inactive') DEFAULT 'active',
	`category_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` varchar(36),
	`image_path` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified_at` timestamp,
	`password` varchar(255) NOT NULL,
	`remember_token` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
