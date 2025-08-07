import { defineEventHandler, readBody, createError } from 'h3'
import { useDatabase } from '~~/server/utils/database'
import { expensesTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const body = await readBody(event);

    // Note: In a real application, you would add more robust validation here.
    // For example, using a library like Zod.
    if (!body.description || !body.amount || !body.date) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: description, amount, date',
        });
    }

    const newExpenseData = {
        description: body.description,
        amount: body.amount,
        date: body.date, // 日期已经是时间戳格式
        receiptUrl: body.receiptUrl,
        categoryId: body.categoryId,
    };

    const [newExpense] = await db.insert(expensesTable).values(newExpenseData).returning();

    return newExpense;
})