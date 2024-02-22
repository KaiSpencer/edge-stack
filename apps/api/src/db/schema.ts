import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Todos
 */
export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  completedTimestamp: integer("completed_timestamp", { mode: "timestamp_ms" }),
});
