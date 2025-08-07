import { defineEventHandler, createError } from 'h3'
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
    
    // 检查字典项是否存在
    const existingItem = await db.select().from(dictionariesTable).where({ id }).limit(1);
    if (existingItem.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Dictionary item not found'
        });
    }
    
    // 删除字典项
    await db.delete(dictionariesTable).where({ id });
    
    return {
        message: '字典项删除成功'
    }
})