
<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
const months = ref(['2025-07', '2025-06', '2025-05'])
const selectedMonth = ref()

const categories = ref(['猫粮狗粮', '医疗费', '绝育手术'])
const selectedCategory = ref()

type Transaction = {
  id: number
  date: string
  description: string
  amount: string
  category: string
}

const columns: TableColumn<Transaction>[] = [
  {accessorKey: "date", header: "日期"},
  {accessorKey: "description", header: "描述"},
  {accessorKey: "amount", header: "金额"},
  {accessorKey: "category", header: "分类"},
]

const transactions = ref<Transaction[]>([
  { id: 1, date: '2025-07-15', description: '购买猫粮', amount: '-¥256.00', category: '猫粮狗粮' },
  { id: 2, date: '2025-07-14', description: '收到捐款-张女士', amount: '+¥500.00', category: '捐款' },
  { id: 3, date: '2025-07-12', description: '猫咪绝育手术', amount: '-¥800.00', category: '绝育手术' },
  { id: 4, date: '2025-07-10', description: '皮肤病治疗', amount: '-¥450.00', category: '医疗费' },
])
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">财务报表</h2>
    
    <div class="flex gap-4 mb-4">
      <USelectMenu v-model="selectedMonth" :items="months" placeholder="选择月份" />
      <USelectMenu v-model="selectedCategory" :items="categories" placeholder="选择分类" />
    </div>
    <UTable :columns="columns" :data="transactions" />
  </div>
</template>