import { defineEventHandler, getQuery } from 'h3'
import { useDatabase } from '../../utils/database';
import { dictionariesTable } from '../../db/schema';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const query = getQuery(event);
    const key = query.key as string | undefined;

    let types;
    if (key) {
        types = await db.select({
            value: dictionariesTable.value,
            text: dictionariesTable.text,
        })
            .from(dictionariesTable)
            .where(sql`${dictionariesTable.key} = ${key}`);

        console.log('Types found:', types);
        return types;
    } else {
        return []
    }
})