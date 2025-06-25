

import {
  mysqlTable,
  varchar,
  timestamp,
  int,
  text,
  decimal,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';



export const Category = mysqlTable('categories', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const Label = mysqlTable('labels', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const Product = mysqlTable('products', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(), // UUID
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).default('0.00').notNull(),
  quantity: int('quantity').default(0).notNull(),
  threeDImage: text('three_d_image'),
  status: mysqlEnum('status', ['active', 'inactive']).default('active').notNull(),
  categoryId: int('category_id').notNull(),
  labelId: int('label_id'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow().notNull(),
});

export const ProductImage = mysqlTable('product_images', {
  id: int('id').autoincrement().primaryKey(),
  productId: varchar('product_id', { length: 36 }),
  imagePath: text('image_path'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const Order = mysqlTable("orders", {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  productId: varchar('product_id', { length: 36 }),

  // Customer information
  userEmail: varchar("user_email", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  userPhone: varchar("user_phone", { length: 255 }).notNull(),

  // Shipping info
  shippingStreetAddress: varchar("shipping_street_address", { length: 255 }).notNull(),
  shippingCity: varchar("shipping_city", { length: 255 }).notNull(),
  shippingStateProvince: varchar("shipping_state_province", { length: 255 }),
  shippingPostalCode: varchar("shipping_postal_code", { length: 255 }).notNull(),
  shippingCountry: varchar("shipping_country", { length: 2 }).notNull(),

  // Order details
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  paymentStatus: mysqlEnum("payment_status", ["unpaid", "paid"]).default("unpaid").notNull(),
  orderedAt: timestamp("ordered_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

