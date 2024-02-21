CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`completed_timestamp` integer
);
--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
DROP TABLE `items_to_shopping_lists`;--> statement-breakpoint
DROP TABLE `shoppingLists`;