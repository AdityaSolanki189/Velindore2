import { eq } from "drizzle-orm";
import { db } from "../db/db.config";
import { Category, Product, ProductImage } from "../db/schema";
import { groupByArrayField } from "../helper/realtions";

export async function getAllProducts() {
    const results = await db
        .select({
            id: Product.id,
            name: Product.name,
            description: Product.description,
            price: Product.price,
            categoryId: Product.categoryId,
            categoryName: Category.name, // ← fetch category name
            createdAt: Product.createdAt,
            updatedAt: Product.updatedAt,
            imageUrl: ProductImage.imagePath,
        })
        .from(Product)
        .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
        .leftJoin(Category, eq(Product.categoryId, Category.id))
        .limit(1); // ← join with Category


    return groupByArrayField(results, "id", "imageUrl");

}