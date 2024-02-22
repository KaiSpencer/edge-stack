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

  it("GET /todos should return todos", async () => {
    const res = await worker.fetch("/todos");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([
      {
        id: expect.any(Number),
        name: "thing1",
        completed: false,
        completedTimestamp: null,
      },
      {
        id: expect.any(Number),
        name: "thing2",
        completed: false,
        completedTimestamp: null,
      },
      {
        id: expect.any(Number),
        name: "thing3",
        completed: false,
        completedTimestamp: null,
      },
      {
        id: expect.any(Number),
        name: "thing4",
        completed: true,
        completedTimestamp: "2024-02-21T15:09:14.724Z",
      },
    ]);
  });
  it("POST /todos should add a todo", async () => {
    const res = await worker.fetch("/todos", {
      method: "POST",
      body: new URLSearchParams({ name: "thing5" }),
    });
    expect(res.status).toBe(200);

    expect(await res.json()).to.have.property("success", true);
  });
  it("PUT /todos/mark-complete should insert a complete todo", async () => {
    const res = await worker.fetch("/todos/mark-complete", {
      method: "PUT",
      body: new URLSearchParams({ id: "5" }),
    });
    expect(res.status).toBe(200);
    const after = await worker.fetch("/todos");
    const afterJson = (await after.json()) as object[];
    expect(afterJson).to.have.length(5);
    expect(afterJson[4]).to.have.property("completed", true);
  });
  it("PUT /todos/mark-complete should update todo to complete", async () => {
    const res = await worker.fetch("/todos/mark-complete", {
      method: "PUT",
      body: new URLSearchParams({ id: "1" }),
    });
    expect(res.status).toBe(200);
    const after = await worker.fetch("/todos");
    const afterJson = (await after.json()) as object[];
    expect(afterJson).to.have.length(5);
    expect(afterJson[0]).to.have.property("completed", true);
  });
  it("DELETE /todos should remove a todo", async () => {
    const res = await worker.fetch("/todos", {
      method: "DELETE",
      body: new URLSearchParams({ id: "5" }),
    });
    expect(res.status).toBe(200);
    const after = await worker.fetch("/todos");
    const afterJson = (await after.json()) as object[];
    expect(afterJson).to.have.length(4);
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
