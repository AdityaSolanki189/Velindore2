import { db } from "../db/db.config"
import { Order } from "../db/schema"

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
  //   totalPrice: "999.99",
  // }

export async function createOrder(order : OrderInsert ) : Promise<{ success: boolean; message: string }> {
  try {
    const result = await db.insert(Order).values(order);
    return { success: true, message : "Order created" };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, message: "Failed to create order" };
  }
}
