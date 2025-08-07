import { defineEventHandler } from 'h3'
import { incomesTable } from '~~/server/db/schema'
import { useDatabase } from '~~/server/utils/database'

export default defineEventHandler(() => {
    const db = useDatabase();
    const incomes = db.select().from(incomesTable);
    return incomes;
})