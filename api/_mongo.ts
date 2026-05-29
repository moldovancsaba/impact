import { MongoClient, type Collection, type Document } from "mongodb";

export type SubmissionDocument = {
  submission_id: string;
  received_at: string;
  payload_sha256: string;
  run_id: string;
  schema_version: string;
  profile_json: unknown;
  dashboard_summary_json: unknown | null;
};

export class MongoConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MongoConfigError";
  }
}

function mongoConfig(): { uri: string; dbName: string; collectionName: string } {
  const uri = process.env.MONGODB_URI?.trim();
  const dbName = process.env.MONGODB_DB?.trim();
  const collectionName = process.env.MONGODB_COLLECTION_SUBMISSIONS?.trim() || "submissions";
  if (!uri) {
    throw new MongoConfigError("Missing required env MONGODB_URI");
  }
  if (!dbName) {
    throw new MongoConfigError("Missing required env MONGODB_DB");
  }
  return { uri, dbName, collectionName };
}

type GlobalMongoCache = {
  clientPromise?: Promise<MongoClient>;
  indexesReady?: Promise<void>;
};

function globalCache(): GlobalMongoCache {
  const g = globalThis as typeof globalThis & { __impactMongo?: GlobalMongoCache };
  if (!g.__impactMongo) {
    g.__impactMongo = {};
  }
  return g.__impactMongo;
}

export async function getMongoClient(): Promise<MongoClient> {
  const { uri } = mongoConfig();
  const cache = globalCache();
  if (!cache.clientPromise) {
    const client = new MongoClient(uri);
    cache.clientPromise = client.connect();
  }
  return cache.clientPromise;
}

export async function getSubmissionsCollection(): Promise<Collection<SubmissionDocument>> {
  const { dbName, collectionName } = mongoConfig();
  const client = await getMongoClient();
  const collection = client.db(dbName).collection<SubmissionDocument>(collectionName);

  const cache = globalCache();
  if (!cache.indexesReady) {
    cache.indexesReady = Promise.all([
      collection.createIndex({ payload_sha256: 1 }, { unique: true }),
      collection.createIndex({ run_id: 1 }, { unique: true }),
      collection.createIndex({ received_at: 1 }),
    ]).then(() => undefined);
  }
  await cache.indexesReady;

  return collection;
}

export function isMongoDuplicateError(error: unknown): error is Document & { code: number } {
  return Boolean(error && typeof error === "object" && "code" in error && (error as { code: number }).code === 11000);
}
