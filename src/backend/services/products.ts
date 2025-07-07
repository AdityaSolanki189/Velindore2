'use server';

import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/db.config";
import { Category, Label, Product, ProductImage } from "../db/schema";
import { groupByArrayField } from "../helper/realtions";

// fetches all products
export async function fetchAllProducts() {
  const results = await db
    .select({
      id: Product.id,
      name: Product.name,
      description: Product.description,
      price: Product.price,
      status: Product.status,
      quantity: Product.quantity,
      categoryId: Product.categoryId,
      labelId: Product.labelId,
      categoryName: Category.name,
      createdAt: Product.createdAt,
      updatedAt: Product.updatedAt,
      imageUrl: ProductImage.imagePath,
    })
    .from(Product)
    .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
    .leftJoin(Category, eq(Product.categoryId, Category.id))
    .where(eq(Product.status, 'active'))
    .orderBy(desc(Product.createdAt))
    ;

  return groupByArrayField(results, "id", "imageUrl");

}


//fetch single product by id
export async function fetchSingleProduct(productId: string): Promise<{
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  quantity: number;
  categoryId: string;
  labelId: string | null;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string[];
} | null> {

  const results = await db
    .select({
      id: Product.id,
      name: Product.name,
      description: Product.description,
      price: Product.price,
      status: Product.status,
      quantity: Product.quantity,
      categoryId: Product.categoryId,
      labelId: Product.labelId,
      categoryName: Category.name,
      createdAt: Product.createdAt,
      updatedAt: Product.updatedAt,
      imageUrl: ProductImage.imagePath,
    })
    .from(Product)
    .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
    .leftJoin(Category, eq(Product.categoryId, Category.id))
    .where(
      and(
        eq(Product.status, 'active'),
        eq(Product.id, productId)
      )
    );

  const finalResult = groupByArrayField(results, "id", "imageUrl");

  return finalResult[0] ?? null; // safe return
}

//fetch  products by category
export async function fetchProductsByCategory(categoryName: string) {
  const results = await db
    .select({
      id: Product.id,
      name: Product.name,
      description: Product.description,
      price: Product.price,
      status: Product.status,
      quantity: Product.quantity,
      categoryId: Product.categoryId,
      labelId: Product.labelId,
      categoryName: Category.name,
      createdAt: Product.createdAt,
      updatedAt: Product.updatedAt,
      imageUrl: ProductImage.imagePath,
    })
    .from(Product)
    .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
    .leftJoin(Category, eq(Product.categoryId, Category.id))
    .where(
      and(
        eq(Product.status, 'active'),
        eq(Category.name, categoryName)
      )
    )
    .orderBy(desc(Product.createdAt))
    ;
  return groupByArrayField(results, "id", "imageUrl");
}

export async function fetchAllLabels() {
  const results = await db
    .select({
      id: Label.id,
      name: Label.name,
    })
    .from(Label);

  return results;
}


export async function fetchProductsByLabel(labelName: string) {
  const results = await db
    .select({
      id: Product.id,
      name: Product.name,
      description: Product.description,
      price: Product.price,
      status: Product.status,
      quantity: Product.quantity,

      categoryId: Product.categoryId,
      categoryName: Category.name, // added
      labelId: Product.labelId,
      labelName: Label.name,
      createdAt: Product.createdAt,
      updatedAt: Product.updatedAt,
      imageUrl: ProductImage.imagePath,
    })
    .from(Product)
    .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
    .leftJoin(Label, eq(Product.labelId, Label.id))
    .leftJoin(Category, eq(Product.categoryId, Category.id)) // added
    .where(
      and(
        eq(Product.status, 'active'),
        eq(Label.name, labelName)
      )
    )
    .orderBy(desc(Product.createdAt));

  return groupByArrayField(results, "id", "imageUrl");
}
