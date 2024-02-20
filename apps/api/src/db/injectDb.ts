import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import type { Context } from "hono";
import * as schema from "./schema";

export type Bindings = {
  // biome-ignore lint/correctness/noUndeclaredVariables: this is fine for Hono
  // biome-ignore lint/style/useNamingConvention: this is fine for Hono
  DB: D1Database;
};

export type Variables = {
  db: DrizzleD1Database<typeof schema>;
};

export function createDb(c: Context) {
  return drizzle(c.env.DB, { schema });
}

export default async function injectDb(c: Context, next: () => Promise<void>) {
  c.set("db", createDb(c));
  await next();
}
