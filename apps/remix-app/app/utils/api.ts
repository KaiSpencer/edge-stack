import app from "@edge-stack/api";
import { AppLoadContext } from "@remix-run/cloudflare";
import { hc } from "hono/client";

export const API = (context: AppLoadContext) => {
  const env = context.cloudflare.env as Record<string, string>;
  return hc<typeof app>(env.API_URL);
};
