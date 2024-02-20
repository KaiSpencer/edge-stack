import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import pagesPlugin from "@hono/vite-dev-server/cloudflare-pages";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    build({ entry: "src/index.ts" }),
    devServer({
      entry: "src/index.ts",
      plugins: [
        pagesPlugin({
          // biome-ignore lint/style/useNamingConvention: These are Cloudflare Pages environment variables
          d1Databases: { DB: "f3570301-aac9-4dc1-97b9-84adecb87f4c" },
          d1Persist: "./.wrangler/state/v3/d1",
        }),
      ],
    }),
  ],
});
