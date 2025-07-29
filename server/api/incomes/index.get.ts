import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
    return [
        { id: 1, timestamp: '2025-07-14T10:00:00Z', amount: 500.00, donor_name: '张女士', message: '加油！', payment_method: '微信' },
        { id: 2, timestamp: '2025-07-10T15:30:00Z', amount: 200.00, donor_name: '匿名用户', message: '', payment_method: '支付宝' },
    ]
})