import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // In a real application, you would add validation and save to a database here.
    return {
        message: 'Expense created successfully',
        expense: body
    }
})