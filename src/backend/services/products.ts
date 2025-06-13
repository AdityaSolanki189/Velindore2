import { and, eq } from "drizzle-orm";
import { db } from "../db/db.config";
import { Category, Product, ProductImage } from "../db/schema";
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
      categoryId: Product.categoryId,
      categoryName: Category.name,
      createdAt: Product.createdAt,
      updatedAt: Product.updatedAt,
      imageUrl: ProductImage.imagePath,
    })
    .from(Product)
    .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
    .leftJoin(Category, eq(Product.categoryId, Category.id))
    .where(eq(Product.status, 'active'));

  return groupByArrayField(results, "id", "imageUrl");

}


//fetch single product by id
export async function fetchSingleProduct(productId: string): Promise<{
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  categoryId: string;
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
      categoryId: Product.categoryId,
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
      categoryId: Product.categoryId,
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
    );
  return groupByArrayField(results, "id", "imageUrl");
}
