<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-center">添加支出</h1>

    <div class="bg-white rounded-lg shadow-md p-6">
      <UForm :state="state" @submit="onSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="描述" name="description" required>
            <UInput v-model="state.description" placeholder="支出描述" size="lg" />
          </UFormField>

          <UFormField label="金额" name="amount" required>
            <UInput v-model.number="state.amount" type="number" size="lg" />
          </UFormField>

          <UFormField label="日期" name="date" required>
            <UInput v-model="state.date" type="date" size="lg" />
          </UFormField>

          <UFormField label="分类" name="categoryId" required>
            <USelect v-model="state.categoryId" :options="categories" option-attribute="name" value-attribute="id"
              size="lg" />
          </UFormField>
        </div>

        <UFormField label="收据URL（可选）" name="receiptUrl">
          <UInput v-model="state.receiptUrl" placeholder="收据URL" size="lg" />
        </UFormField>

        <div class="flex justify-center gap-4 pt-4">
          <UButton type="submit" :loading="loading" size="lg" class="px-8">
            保存支出
          </UButton>
          <UButton variant="outline" @click="router.back()" size="lg" class="px-8">
            取消
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const loading = ref(false)

// 初始化表单状态
const state = ref({
  description: '',
  amount: null,
  date: new Date().toISOString().split('T')[0],
  categoryId: null,
  receiptUrl: ''
})

// 获取分类数据
const { data: categories } = await useFetch('/api/dictionaries', {
  query: { type: 'expense_category' }
})

const onSubmit = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/expenses', {
      method: 'POST',
      body: {
        description: state.value.description,
        amount: state.value.amount,
        date: new Date(state.value.date).getTime(),
        categoryId: state.value.categoryId,
        receiptUrl: state.value.receiptUrl
      }
    })

    console.log('Expense created:', response)
    // 添加成功后返回到财务报表页面
    router.push('/finance')
  } catch (error) {
    console.error('Error creating expense:', error)
    // 显示错误消息
  } finally {
    loading.value = false
  }
}
</script>