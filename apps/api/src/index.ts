import { Hono } from "hono";
import injectDb, { type Bindings, type Variables } from "./db/injectDb";
// import { items } from "./db/schema";

// biome-ignore lint/style/useNamingConvention: Hono variables are fine
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .get("/", (c) => {
    return c.json({ message: "Pong!" });
  })
  .get("/items", injectDb, async (c) => {
    return c.json(await c.get("db").query.items.findMany().execute());
  });

export default app;
