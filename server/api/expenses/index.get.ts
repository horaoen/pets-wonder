import { defineEventHandler } from 'h3'
import { expensesTable } from '../../db/schema';
import { useDatabase } from '../../utils/database';

export default defineEventHandler(async () => {
    const db = useDatabase();
    const expenses = await db.select().from(expensesTable);
    return expenses;
})