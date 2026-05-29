import type { VercelRequest, VercelResponse } from "@vercel/node";
import { corsHeaders, sendJson, statsMinBucketCount } from "../_util";
import { getSubmissionsCollection } from "../_mongo";
import { buildFullStatsFromRows, toHardware, toModels, toOverview, toTools } from "../stats-core";

const ALLOWED = new Set(["overview", "full", "hardware", "tools", "models"]);

function segmentName(req: VercelRequest): string {
  const q = req.query.segment;
  if (typeof q === "string") {
    return q;
  }
  if (Array.isArray(q) && typeof q[0] === "string") {
    return q[0];
  }
  return "";
}

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

  const segment = segmentName(req);
  if (!ALLOWED.has(segment)) {
    sendJson(res, 404, { error: "Unknown stats segment" });
    return;
  }

  try {
    const submissions = await getSubmissionsCollection();
    const rows = await submissions
      .find(
        {},
        {
          projection: { profile_json: 1, dashboard_summary_json: 1 },
          sort: { received_at: 1 },
        },
      )
      .toArray();
    const stats = buildFullStatsFromRows(rows, statsMinBucketCount());
    switch (segment) {
      case "overview":
        sendJson(res, 200, toOverview(stats));
        return;
      case "full":
        sendJson(res, 200, stats);
        return;
      case "hardware":
        sendJson(res, 200, toHardware(stats));
        return;
      case "tools":
        sendJson(res, 200, toTools(stats));
        return;
      case "models":
        sendJson(res, 200, toModels(stats));
        return;
      default:
        sendJson(res, 404, { error: "Unknown stats segment" });
    }
  } catch {
    sendJson(res, 503, { error: "database_unavailable" });
  }
}
