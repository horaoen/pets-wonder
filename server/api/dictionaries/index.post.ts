import { defineEventHandler, readBody, createError } from 'h3'
import { useDatabase } from '../../utils/database';
import { dictionariesTable } from '../../db/schema';

export default defineEventHandler(async (event) => {
    const db = useDatabase();
    const body = await readBody(event)
    
    // 验证必填字段
    if (!body.type || !body.key || !body.value) {
        throw createError({
            statusCode: 400,
            statusMessage: '字典类型、键和值都是必填项'
        });
    }
    
    // 检查是否已存在相同的类型和键
    const existing = await db.select()
        .from(dictionariesTable)
        .where({ 
            type: body.type, 
            key: body.key 
        });
        
    if (existing.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: '该字典类型和键已存在'
        });
    }
    
    // 插入新字典项
    const [newDictItem] = await db.insert(dictionariesTable)
        .values({
            type: body.type,
            key: body.key,
            value: body.value,
            description: body.description
        })
        .returning();
    
    return {
        message: '字典项创建成功',
        dictItem: newDictItem
    }
})