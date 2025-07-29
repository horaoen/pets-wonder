import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
        message: 'Category created successfully',
        category: body
    }
})