import { drizzle } from "drizzle-orm/singlestore";

export default defineEventHandler(async () => {
    return [
        { id: 1, name: '猫粮狗粮' },
        { id: 2, name: '医疗费' },
        { id: 3, name: '绝育手术' },
    ]
})