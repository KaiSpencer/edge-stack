import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * Items
 */
export const items = sqliteTable("items", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const itemsRelations = relations(items, ({ many }) => ({
  itemsToShoppingLists: many(itemsToShoppingLists),
}));

export const shoppingLists = sqliteTable("shoppingLists", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const shoppingListRelations = relations(shoppingLists, ({ many }) => ({
  itemsToShoppingLists: many(itemsToShoppingLists),
}));

/**
 * Items to Shopping Lists
 */
export const itemsToShoppingLists = sqliteTable(
  "items_to_shopping_lists",
  {
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id),
    shoppingListId: integer("shopping_list_id")
      .notNull()
      .references(() => shoppingLists.id),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.itemId, table.shoppingListId],
      }),
    };
  }
);

export const itemsToShoppingListsRelations = relations(
  itemsToShoppingLists,
  ({ one }) => ({
    item: one(items, {
      fields: [itemsToShoppingLists.itemId],
      references: [items.id],
    }),
    outfit: one(shoppingLists, {
      fields: [itemsToShoppingLists.shoppingListId],
      references: [shoppingLists.id],
    }),
  })
);
