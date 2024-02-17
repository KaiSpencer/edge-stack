CREATE TABLE `items` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `items_to_shopping_lists` (
	`item_id` integer NOT NULL,
	`shopping_list_id` integer NOT NULL,
	PRIMARY KEY(`item_id`, `shopping_list_id`),
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shopping_list_id`) REFERENCES `shoppingList`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shoppingList` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
