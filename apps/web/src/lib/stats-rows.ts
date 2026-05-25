export type StatsBucket = { key: string; count: number };

export function bucketsToRows(rows: StatsBucket[]) {
  return rows.map((row) => ({ key: row.key, count: row.count }));
}
