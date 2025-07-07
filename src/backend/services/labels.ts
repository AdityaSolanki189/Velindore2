'use server';

import { db } from "../db/db.config";
import { Label, Product } from "../db/schema"; // Assuming you have a Product table
import { eq } from "drizzle-orm";

export async function fetchAllLabels() {
    const results = await db.select().from(Label);
    return results;
}

// New function to fetch labels with their products
export async function fetchLabelsWithProducts() {
    try {
        const labels = await db.select().from(Label);
        
        const labelsWithProducts = await Promise.all(
            labels.map(async (label) => {
                // Fetch products for this label
                const products = await db.select()
                    .from(Product)
                    .where(eq(Product.labelId, label.id)) // Assuming Product has a labelId field
                    .limit(10); // Limit to first 10 products per label
                
                return {
                    ...label,
                    products: products
                };
            })
        );
        
        return labelsWithProducts;
    } catch (error) {
        console.error('Error fetching labels with products:', error);
        return [];
    }
}