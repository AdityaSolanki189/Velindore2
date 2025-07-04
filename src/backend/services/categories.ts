'use server';


import { db } from "../db/db.config";
import { Category } from "../db/schema";

export async function fetchAllCategories() {
    const results = await db.select().from(Category);

    return results;

}