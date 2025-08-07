import { defineEventHandler, getQuery } from 'h3'
import { expensesTable } from '~~/server/db/schema';
import { useDatabase } from '~~/server/utils/database';
import { and, gte, lte, sql, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const query = getQuery(event);
    const startDate = query.startDate as string | undefined;
    const endDate = query.endDate as string | undefined;
    const categoryId = query.categoryId as string | undefined;

    let expenses;

    // 构建查询条件
    const conditions = [];

    if (startDate && endDate) {
        // Convert dates to timestamps
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime() + 86399999; // Add end of day
        conditions.push(
            gte(expensesTable.date, sql`${startTimestamp}`),
            lte(expensesTable.date, sql`${endTimestamp}`)
        );
    }

    if (categoryId) {
        conditions.push(eq(expensesTable.categoryId, parseInt(categoryId)));
    }

    if (conditions.length > 0) {
        expenses = await db.select().from(expensesTable)
            .where(and(...conditions));
    } else {
        expenses = await db.select().from(expensesTable);
    }

    return expenses;
})