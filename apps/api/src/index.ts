import { Hono } from "hono";

const v1_0 = new Hono().get("/", (c) => c.json({ message: "Pong!" }));

const app = new Hono().route("/v1.0", v1_0);
export default app;
