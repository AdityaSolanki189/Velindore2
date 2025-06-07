

// lib/schema.ts
import {
  mysqlTable,
  varchar,
  timestamp,
  int,
  text,
  decimal,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

export const User = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  emailVerifiedAt: timestamp('email_verified_at', { mode: 'date' }),
  password: varchar('password', { length: 255 }).notNull(),
  rememberToken: varchar('remember_token', { length: 100 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const Category = mysqlTable('categories', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const Product = mysqlTable('products', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  name: varchar('name', { length: 255 }),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0.00'),
  quantity: int('quantity').default(0),
  threeDImage: text('three_d_image'),
  status: mysqlEnum('status', ['active', 'inactive']).default('active'),
  categoryId: int('category_id'),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const ProductImage = mysqlTable('product_images', {
  id: int('id').autoincrement().primaryKey(),
  productId: varchar('product_id', { length: 36 }),
  imagePath: text('image_path'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const Order = mysqlTable('orders', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID

  productId: varchar('product_id', { length: 36 }),
  userId: varchar('user_id', { length: 36 }),

  shippingAddress: varchar('shipping_address', { length: 255 }),

  quantity: int('quantity'),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }),

  status: mysqlEnum('status', [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ]).default('pending'),

  orderedAt: timestamp('ordered_at', { mode: 'date' }).defaultNow(),
  shippedAt: timestamp('shipped_at', { mode: 'date' }),
  deliveredAt: timestamp('delivered_at', { mode: 'date' }),
  cancelledAt: timestamp('cancelled_at', { mode: 'date' }),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
}) 

