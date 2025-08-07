<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const startDate = ref()
const endDate = ref()

const categories = ref(['猫粮狗粮', '医疗费', '绝育手术'])
const selectedCategory = ref()

const searchByDateRange = async () => {
  await refresh();
}

interface Expense {
  id: number
  date: string
  description: string
  amount: number
  category_id: number
  receipt_url: string
}

const { data: transactions, refresh } = await useFetch<Expense[]>('/api/expenses', {
  query: {
    startDate: startDate.value,
    endDate: endDate.value
  }
})

const columns: TableColumn<Expense>[] = [
  { accessorKey: 'date', header: '日期' },
  { accessorKey: 'description', header: '摘要' },
  { accessorKey: 'amount', header: '金额' },
  { accessorKey: 'category_id', header: '分类ID' },
  { accessorKey: 'actions', header: '操作' }
]

const chartOptions = ref({
  title: {
    text: '支出分类占比',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['猫粮狗粮', '医疗费', '绝育手术'],
  },
  series: [
    {
      name: '支出分类',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 256, name: '猫粮狗粮' },
        { value: 450, name: '医疗费' },
        { value: 800, name: '绝育手术' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">财务报表</h2>
      <UButton to="/finance/expense/add" icon="i-heroicons-plus">添加支出</UButton>
    </div>

    <div class="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
        <UInput v-model="startDate" type="date" size="lg" />
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
        <UInput v-model="endDate" type="date" size="lg" />
      </div>
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
        <USelectMenu v-model="selectedCategory" :items="categories" placeholder="选择分类" size="lg" />
      </div>
      <div class="flex items-end">
        <UButton @click="searchByDateRange" size="lg" class="h-full">搜索</UButton>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <UTable :columns="columns" :data="transactions" class="w-full">
        <template #actions-cell="{ row }">
          <UButton :to="`/finance/expense/${row.id}`" variant="soft" size="sm">详情</UButton>
        </template>
      </UTable>
    </div>
    <div class="mt-8 bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-semibold mb-4">支出分类占比</h3>
      <ClientOnly>
        <div style="height: 400px;">
          <v-chart :option="chartOptions" />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>