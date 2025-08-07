CREATE TABLE `dictionaries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`text` text DEFAULT '',
	`description` text
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`amount` real NOT NULL,
	`date` integer NOT NULL,
	`receipt_url` text,
	`category_id` integer
);
--> statement-breakpoint
CREATE TABLE `incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`amount` real NOT NULL,
	`date` integer NOT NULL,
	`category_id` integer
);
