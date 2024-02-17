import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import type { Context } from "hono";
import * as schema from "./schema";

export type Bindings = {
  DB: D1Database;
};

export type Variables = {
  db: DrizzleD1Database<typeof schema>;
};

export function createDB(c: Context) {
  return drizzle(c.env.DB, { schema });
}

export default async function injectDB(c: Context, next: () => Promise<void>) {
  c.set("db", createDB(c));
  await next();
}
