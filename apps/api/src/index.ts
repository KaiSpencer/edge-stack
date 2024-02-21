// import { items } from "./db/schema";
import { zValidator } from "@hono/zod-validator";
import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { logger } from "hono/logger";
import z from "zod";
import injectDb, { type Bindings, type Variables } from "./db/injectDb";
import { todos } from "./db/schema";

// biome-ignore lint/style/useNamingConvention: Hono variables are fine
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .use(logger())
  .get("/", (c) => {
    return c.json({ message: "Pong!" });
  })
  .get("/todos", injectDb, async (c) => {
    return c.json(await c.get("db").query.todos.findMany().execute());
  })
  .post(
    "/todos",
    injectDb,
    zValidator(
      "form",
      z.object({
        name: z.string(),
      }),
    ),
    async (c) => {
      const { name } = c.req.valid("form");
      return c.json(await c.get("db").insert(todos).values({ name }).execute());
    },
  )
  .delete(
    "/todos",
    injectDb,
    zValidator(
      "form",
      z.object({
        id: z.string().transform((id) => Number(id)),
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("form");
      await c.get("db").delete(todos).where(eq(todos.id, id)).execute();
      return c.json({ success: true });
    },
  )
  .put(
    "/todos/mark-complete",
    injectDb,
    zValidator(
      "form",
      z.object({
        id: z.string().transform((id) => Number(id)),
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("form");
      await c
        .get("db")
        .update(todos)
        .set({
          completed: sql`NOT ${todos.completed}`,
          completedTimestamp: new Date(),
        })
        .where(eq(todos.id, id))
        .execute();
      return c.json({ success: true });
    },
  );

export default app;
