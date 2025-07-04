'use server';

import { db } from "../db/db.config"
import { Order, Product } from "../db/schema"
import { eq } from "drizzle-orm"; // or your query helper

  // const order : OrderInsert = {
  //   id: randomUUID(),
  //   productId: "87361d1a-ff48-40ab-8165-b80c2468ceaa",

  //   userEmail: "john@example.com",
  //   userName: "John Doe",
  //   userPhone: "9876543210",

  //   shippingStreetAddress: "123 Main Street",
  //   shippingCity: "Kolkata",
  //   shippingStateProvince: "West Bengal",
  //   shippingPostalCode: "700001",
  //   shippingCountry: "IN",

  //   quantity: 2,
  //  price: "499.99",  
  //   tax: "50.00",
  //   totalPrice: "999.99",
  // }


export async function createOrder(order: OrderInsert): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Get product ID and requested quantity
    const { productId, quantity } = order;

    // 2. Fetch product from DB
    const products = await db
      .select()
      .from(Product)
      .where(eq(Product.id, productId));

    const product = products[0];

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // 3. Check if enough quantity is available
    if (product.quantity < quantity) {
      return { success: false, message: "Insufficient stock available" };
    }

    // 4. Proceed to create order
    await db.insert(Order).values(order);

    // Optionally: reduce the product quantity
    await db
      .update(Product)
      .set({ quantity: product.quantity - quantity })
      .where(eq(Product.id, productId));

    return { success: true, message: "Order created" };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, message: "Failed to create order" };
  }
}

