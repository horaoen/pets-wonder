import { defineEventHandler, getQuery } from 'h3'
import { useDatabase } from '../../utils/database';
import { dictionariesTable } from '../../db/schema';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const query = getQuery(event);
    const type = query.type as string | undefined;
    
    let dictionaries;
    if (type) {
        dictionaries = await db.select().from(dictionariesTable).where({ type });
    } else {
        dictionaries = await db.select().from(dictionariesTable);
    }
    
    return dictionaries;
})