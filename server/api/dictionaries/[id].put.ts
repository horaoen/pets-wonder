import { defineEventHandler, readBody, createError } from 'h3'
import { useDatabase } from '../../utils/database';
import { dictionariesTable } from '../../db/schema';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const id = parseInt(event.context.params.id);
    const body = await readBody(event);
    
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
    
    // 检查是否已存在相同的类型和键（排除当前项）
    if (body.type && body.key) {
        const duplicateItem = await db.select()
            .from(dictionariesTable)
            .where({ 
                type: body.type, 
                key: body.key 
            })
            .where(sql`${dictionariesTable.id} != ${id}`);
            
        if (duplicateItem.length > 0) {
            throw createError({
                statusCode: 400,
                statusMessage: '该字典类型和键已存在'
            });
        }
    }
    
    // 更新字典项
    const [updatedItem] = await db.update(dictionariesTable)
        .set({
            type: body.type || existingItem[0].type,
            key: body.key || existingItem[0].key,
            value: body.value || existingItem[0].value,
            description: body.description
        })
        .where({ id })
        .returning();
    
    return {
        message: '字典项更新成功',
        dictItem: updatedItem
    }
})