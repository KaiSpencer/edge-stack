import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import { getPlatformProxy } from "wrangler";

export default defineConfig(async () => {
  const { env, dispose } = await getPlatformProxy();
  return {
    plugins: [
      devServer({
        env,
        plugins: [{ onServerClose: dispose }],
        entry: "src/index.ts",
      }),
    ],
  };
});
