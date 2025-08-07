import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dictionariesTable = sqliteTable("dictionaries", {
    id: int("id").primaryKey({ autoIncrement: true }),
    type: text("type").notNull(),
    key: text("key").notNull(),
    value: text("value").notNull(),
    text: text("text").default(""),
    description: text("description"),
});

export const expensesTable = sqliteTable("expenses", {
    id: int("id").primaryKey({ autoIncrement: true }),
    description: text("description").notNull(),
    amount: real("amount").notNull(),
    date: int("date", { mode: "timestamp" }).notNull(),
    receiptUrl: text("receipt_url"),
    categoryId: int("category_id"),
});

export const incomesTable = sqliteTable("incomes", {
    id: int("id").primaryKey({ autoIncrement: true }),
    description: text("description").notNull(),
    amount: real("amount").notNull(),
    date: int("date", { mode: "timestamp" }).notNull(),
    categoryId: int("category_id"),
});