import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categoriesTable = sqliteTable("categories", {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
});

export const expensesTable = sqliteTable("expenses", {
    id: int("id").primaryKey({ autoIncrement: true }),
    description: text("description").notNull(),
    amount: real("amount").notNull(),
    date: int("date", { mode: "timestamp" }).notNull(),
    receiptUrl: text("receipt_url"),
    categoryId: int("category_id").references(() => categoriesTable.id),
});

export const incomesTable = sqliteTable("incomes", {
    id: int("id").primaryKey({ autoIncrement: true }),
    description: text("description").notNull(),
    amount: real("amount").notNull(),
    date: int("date", { mode: "timestamp" }).notNull(),
    categoryId: int("category_id").references(() => categoriesTable.id),
});