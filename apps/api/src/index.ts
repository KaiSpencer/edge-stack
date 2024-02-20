import { Hono } from "hono";
import injectDb, { type Bindings, type Variables } from "./db/injectDb";

// biome-ignore lint/style/useNamingConvention: Hono variables are fine
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().get(
  "/",
  injectDb,
  async (c) => {
    const items = await c.get("db").query.items.findMany().execute();
    console.log("ITEMS", items);

    return c.json({ message: "Pong!" });
  },
);

app.get("/items", injectDb, async (c) => {
  return c.json(await c.get("db").query.items.findMany().execute());
});

export default app;
