import type { VercelResponse } from "@vercel/node";

export function corsHeaders(methods: string[] = ["GET", "OPTIONS"]): Record<string, string> {
  const origin = process.env.IMPACT_STATS_CORS_ORIGIN?.trim() || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": methods.join(", "),
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };
}

export function statsMinBucketCount(): number {
  const raw = process.env.IMPACT_STATS_MIN_BUCKET_COUNT?.trim();
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 5;
}

export function sendJson(res: VercelResponse, status: number, body: unknown, methods?: string[]): void {
  for (const [k, v] of Object.entries(corsHeaders(methods))) {
    res.setHeader(k, v);
  }
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.status(status).json(body);
}
