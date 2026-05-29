import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMongoClient, MongoConfigError } from "./_mongo";
import { corsHeaders, sendJson } from "./_util";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }
  try {
    const client = await getMongoClient();
    await client.db().command({ ping: 1 });
    sendJson(res, 200, {
      ok: true,
      service: "impact-vercel-api",
      stats_mode: "mongodb",
      db_status: "ok",
    });
  } catch (e) {
    const missingConfig = e instanceof MongoConfigError;
    sendJson(res, 503, {
      ok: false,
      service: "impact-vercel-api",
      stats_mode: "mongodb",
      db_status: missingConfig ? "not_configured" : "unavailable",
      ...(missingConfig ? { hint: "Set MONGODB_URI and MONGODB_DB on Vercel" } : {}),
    });
  }
}
