<template>
  <UCard>
    <template #header>
      <h2 class="text-2xl font-semibold">支出详情</h2>
    </template>

    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-500">日期</p>
        <p class="font-medium">{{ expense.date }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">摘要</p>
        <p class="font-medium">{{ expense.description }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">金额</p>
        <p class="font-medium">{{ expense.amount }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">分类</p>
        <p class="font-medium">{{ expense.category }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">凭证</p>
        <img :src="expense.receipt_url" alt="支出凭证" class="mt-2 rounded-md border" />
      </div>
    </div>

    <template #footer>
      <UButton to="/finance" icon="i-heroicons-arrow-left-circle">
        返回财务报表
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const expenseId = route.params.id

// 模拟从API获取的数据
const expense = ref({
  id: expenseId,
  date: '2025-07-15',
  description: '购买猫粮',
  amount: '-¥256.00',
  category: '猫粮狗粮',
  receipt_url: 'https://placehold.co/600x400/EEE/31343C?text=Receipt+Placeholder'
})
</script>