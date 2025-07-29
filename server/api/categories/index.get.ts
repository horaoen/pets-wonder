import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
    return [
        { id: 1, name: '猫粮狗粮' },
        { id: 2, name: '医疗费' },
        { id: 3, name: '绝育手术' },
    ]
})