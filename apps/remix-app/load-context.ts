import type { PlatformProxy } from "wrangler";

type Env = {
  // biome-ignore lint/style/useNamingConvention: Environment variables are fine
  API_URL: string;
};

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
