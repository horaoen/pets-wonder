import { defineEventHandler } from 'h3'
import { usersTable } from '~~/server/db/schema';

export default defineEventHandler(async () => {
    test()
    return [
        { id: 1, date: '2025-07-15', description: '购买猫粮', amount: -256.00, category_id: 1, receipt_url: 'https://placehold.co/600x400/EEE/31343C?text=Receipt+1' },
        { id: 2, date: '2025-07-12', description: '猫咪绝育手术', amount: -800.00, category_id: 3, receipt_url: 'https://placehold.co/600x400/EEE/31343C?text=Receipt+2' },
        { id: 3, date: '2025-07-10', description: '皮肤病治疗', amount: -450.00, category_id: 2, receipt_url: 'https://placehold.co/600x400/EEE/31343C?text=Receipt+3' },
    ]
})

async function test() {
    const user: typeof usersTable.$inferInsert = {
        id: 4,
        name: 'John',
        age: 30,
        email: 'john@example.com',
    };

    const db = useDatabase();

    const users = await db.select().from(usersTable);
    console.log('Getting all users from the database: ', users)
}