<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">本月总收入</h3>
        </template>
        <p class="text-2xl font-bold">¥{{ monthlyIncome }}</p>
      </UCard>
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">本月总支出</h3>
        </template>
        <p class="text-2xl font-bold">¥{{ monthlyExpense }}</p>
      </UCard>
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">当前余额</h3>
        </template>
        <p class="text-2xl font-bold">¥{{ currentBalance }}</p>
      </UCard>
    </div>
    <div class="mt-8 text-center">
      <UButton to="/finance" size="xl" icon="i-heroicons-arrow-right-circle">
        查看完整财务报表
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const monthlyIncome = ref('12,345.67')
const monthlyExpense = ref('8,765.43')
const currentBalance = ref('25,876.12')
</script>