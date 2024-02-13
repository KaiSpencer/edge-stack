import app from "@full-stack-cloudflare/api";
import { AppLoadContext } from "@remix-run/cloudflare";
import { hc } from "hono/client";

export const API = (context: AppLoadContext) => {
  const env = context.env as Record<string, string>;
  if (!env.API_URL) throw new Error("API_URL not found in env");
  return hc<typeof app>(env.API_URL);
};
