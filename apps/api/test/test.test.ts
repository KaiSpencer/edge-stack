import { execSync } from "node:child_process";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { type UnstableDevWorker, unstable_dev } from "wrangler";

describe("smoke", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    execSync("bun run seed-test-db");
    worker = await unstable_dev("./src/index.ts", {
      env: "test",
      experimental: {
        disableExperimentalWarning: true,
      },
      ip: "127.0.0.1",
      persistTo: "./test/temp-d1-db",
    });
  });

  afterAll(async () => {
    execSync("bun run clean-test-db");
    await worker.stop();
  });

  it("GET /items should return items", async () => {
    const res = await worker.fetch("/items");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([
      { id: expect.any(Number), name: "item1" },
      { id: expect.any(Number), name: "item2" },
    ]);
  });
  it("GET / should return Pong!", async () => {
    const res = await worker.fetch("/");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "Pong!" });
  });
  it("GET /something-random should return 404", async () => {
    const res = await worker.fetch("/something-random");
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("404 Not Found");
  });
});
