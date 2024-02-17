import { Hono } from "hono";
import injectDB, { Bindings, Variables } from "./db/injectDb";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().get(
  "/",
  injectDB,
  async (c) => {
    const items = await c.get("db").query.items.findMany().execute();
    console.log("[items]", items);

    return c.json({ message: "Pong!" });
  },
);

app.get("/items", injectDB, async (c) => {
  return c.json(await c.get("db").query.items.findMany().execute());
});

export default app;
