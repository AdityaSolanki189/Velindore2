import { eq, InferSelectModel } from "drizzle-orm";
import { Setting } from "../db/schema";
import { db } from "../db/db.config";

type SettingType = InferSelectModel<typeof Setting>;

export async function getSettingsData(): Promise<SettingType | null> {
  const result = await db.select().from(Setting).where(eq(Setting.id, 1)).limit(1);
  return result[0] ?? null;
}
