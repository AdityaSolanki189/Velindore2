/* eslint-disable @typescript-eslint/no-explicit-any */
export function groupByArrayField<T>(
  data: T[],
  idKey: keyof T,
  arrayKey: keyof T
): Record<keyof T, any>[] {
  const map = new Map<any, Record<string, any>>();

  for (const row of data) {
    const id = row[idKey];

    if (!map.has(id)) {
      const baseItem: Record<string, any> = {};

      // Automatically copy all fields except arrayKey
      for (const key in row) {
        if (key !== arrayKey) {
          baseItem[key] = row[key];
        }
      }

      baseItem[arrayKey as string] = [row[arrayKey]];
      map.set(id, baseItem);
    } else {
      const existingItem = map.get(id);
      if (existingItem) {
        existingItem[arrayKey as string].push(row[arrayKey]);
      }
    }
  }

  return Array.from(map.values()) as Record<keyof T, any>[];
}
