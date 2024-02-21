import { Hono } from "hono";
import injectDb, { type Bindings, type Variables } from "./db/injectDb";
// import { items } from "./db/schema";

// biome-ignore lint/style/useNamingConvention: Hono variables are fine
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.get("/", injectDb, async (c) => {
  // await c.get("db").insert(items).values({ name: "test" }).execute();
  const items_ = await c.get("db").query.items.findMany().execute();
  console.log("ITEMS", items_);

  return c.json({ message: `${items_.length} Item(s) in db` });
});

app.get("/items", injectDb, async (c) => {
  return c.json(await c.get("db").query.items.findMany().execute());
});

export default app;
