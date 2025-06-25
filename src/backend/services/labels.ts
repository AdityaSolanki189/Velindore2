import { db } from "../db/db.config";
import { Label } from "../db/schema";

export async function fetchAllLabels() {
    const results = await db.select().from(Label) ;

    return results;

}