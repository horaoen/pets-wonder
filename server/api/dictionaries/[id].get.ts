import { defineEventHandler } from 'h3'
import { useDatabase } from '../../utils/database';
import { dictionariesTable } from '../../db/schema';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const id = parseInt(event.context.params.id);
    
    if (isNaN(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid dictionary ID'
        });
    }
    
    const dictItem = await db.select().from(dictionariesTable).where({ id }).limit(1);
    
    if (dictItem.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Dictionary item not found'
        });
    }
    
    return dictItem[0];
})