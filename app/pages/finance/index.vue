<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
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

const selectedMonth = shallowRef(new CalendarDate(2025, 12, 1))

const selectedMonthLabel = computed(() => {
  if (selectedMonth.value) {
    return selectedMonth.value.toDate('Asia/Shanghai').toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
  }
  return '选择月份'
})

const categories = ref(['猫粮狗粮', '医疗费', '绝育手术'])
const selectedCategory = ref()

interface Expense {
  id: number
  date: string
  description: string
  amount: number
  category_id: number
  receipt_url: string
}

const { data: transactions } = await useFetch<Expense[]>('/api/expenses')

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
    <h2 class="text-2xl font-semibold mb-4">财务报表</h2>

    <div class="flex gap-4 mb-4">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton color="neutral" :label="selectedMonthLabel" />
        <template #panel="{ close }">
          <UCalendar v-model="selectedMonth" @update:model-value="close" />
        </template>
      </UPopover>
      <USelectMenu v-model="selectedCategory" :items="categories" placeholder="选择分类" />
    </div>
    <UTable :columns="columns" :data="transactions">
      <template #actions-cell="{ row }">
        <UButton :to="`/finance/expense/${row.id}`">详情</UButton>
      </template>
    </UTable>
    <ClientOnly>
      <div class="mt-8" style="height: 400px;">
        <v-chart :option="chartOptions" />
      </div>
    </ClientOnly>
  </div>
</template>