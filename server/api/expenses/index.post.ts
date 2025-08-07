import { defineEventHandler, readBody, createError } from 'h3'
import { useDatabase } from '../../utils/database'
import { expensesTable } from '../../db/schema';

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
        date: new Date(body.date),
        receiptUrl: body.receiptUrl,
        categoryId: body.categoryId,
    };

    const [newExpense] = await db.insert(expensesTable).values(newExpenseData).returning();

    return newExpense;
})