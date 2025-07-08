import { InferSelectModel } from "drizzle-orm";
import { Setting } from "./db/schema";

export type OrderInsert = {
  id: string;
  productId: string;

  userEmail: string;
  userName: string;
  userPhone: string;

  shippingStreetAddress: string;
  shippingCity: string;
  shippingStateProvince: string;
  shippingPostalCode: string;
  shippingCountry: string;

  quantity: number;
  price: string;
  tax: string;

  totalPrice: string ;

};

export type SettingType = InferSelectModel<typeof Setting>;
