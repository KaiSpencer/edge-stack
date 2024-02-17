import { type PlatformProxy } from "wrangler";

type Env = {
  API_URL: string;
};

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
