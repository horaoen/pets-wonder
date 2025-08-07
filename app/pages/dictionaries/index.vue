<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">字典管理</h1>
      <UButton @click="openAddModal" icon="i-heroicons-plus">添加字典项</UButton>
    </div>

    <!-- 字典类型筛选 -->
    <div class="mb-6">
      <USelectMenu v-model="selectedDictType" :items="dictTypes" placeholder="选择字典类型" size="lg" value-attribute="value"
        option-attribute="label" @update:model-value="loadDictionaryItems" />
    </div>

    <!-- 字典项列表 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <UTable :columns="columns" :data="dictItems">
        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton variant="soft" icon="i-heroicons-pencil" @click="openEditModal(row)" size="sm">编辑</UButton>
            <UButton variant="soft" color="error" icon="i-heroicons-trash" @click="deleteDictItem(Number(row.id))"
              size="sm">删除
            </UButton>
          </div>
        </template>
      </UTable>
    </div>

    <!-- 添加字典项模态框 -->
    <UModal v-model="isAddModalOpen">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">添加字典项</h2>
        <UForm :state="newDictItem" @submit="addDictItem">
          <UFormField label="字典类型" name="type" required>
            <UInput v-model="newDictItem.type" placeholder="请输入字典类型" size="lg" />
          </UFormField>
          <UFormField label="字典键" name="key" required>
            <UInput v-model="newDictItem.key" placeholder="请输入字典键" size="lg" />
          </UFormField>
          <UFormField label="字典值" name="value" required>
            <UInput v-model="newDictItem.value" placeholder="请输入字典值" size="lg" />
          </UFormField>
          <UFormField label="描述（可选）" name="description">
            <UInput v-model="newDictItem.description" placeholder="请输入描述" size="lg" />
          </UFormField>
          <div class="flex justify-end gap-4 mt-6">
            <UButton variant="outline" @click="isAddModalOpen = false">取消</UButton>
            <UButton type="submit">保存</UButton>
          </div>
        </UForm>
      </div>
    </UModal>

    <!-- 编辑字典项模态框 -->
    <UModal v-model="isEditModalOpen">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">编辑字典项</h2>
        <UForm :state="editingDictItem" @submit="updateDictItem">
          <UFormField label="字典类型" name="type" required>
            <UInput v-model="editingDictItem.type" placeholder="请输入字典类型" size="lg" />
          </UFormField>
          <UFormField label="字典键" name="key" required>
            <UInput v-model="editingDictItem.key" placeholder="请输入字典键" size="lg" />
          </UFormField>
          <UFormField label="字典值" name="value" required>
            <UInput v-model="editingDictItem.value" placeholder="请输入字典值" size="lg" />
          </UFormField>
          <UFormField label="描述（可选）" name="description">
            <UInput v-model="editingDictItem.description" placeholder="请输入描述" size="lg" />
          </UFormField>
          <div class="flex justify-end gap-4 mt-6">
            <UButton variant="outline" @click="isEditModalOpen = false">取消</UButton>
            <UButton type="submit">更新</UButton>
          </div>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface DictItem {
  id: number;
  type: string;
  key: string;
  value: string;
  description: string | null;
}

type NewDictItem = Omit<DictItem, 'id'>

definePageMeta({
  layout: 'default'
})

// 定义表格列
const columns = [
  { accessorKey: 'type', header: '字典类型' },
  { accessorKey: 'key', header: '字典键' },
  { accessorKey: 'value', header: '字典值' },
  { accessorKey: 'description', header: '描述' },
  { accessorKey: 'actions', header: '操作' }
]

// 字典类型
const dictTypes = ref<{ label: string; value: string }[]>([])
const selectedDictType = ref<{ label: string; value: string }>()

// 字典项数据
const dictItems = ref<DictItem[]>([])

// 添加字典项模态框
const isAddModalOpen = ref(false)
const newDictItem = ref<NewDictItem>({
  type: '',
  key: '',
  value: '',
  description: ''
})

// 编辑字典项模态框
const isEditModalOpen = ref(false)
const editingDictItem = ref<DictItem>({
  id: 0,
  type: '',
  key: '',
  value: '',
  description: ''
})

// 获取字典类型列表
const loadDictTypes = async () => {
  try {
    const types = await $fetch('/api/dictionaries/types')
    dictTypes.value = types.map(type => ({ label: type, value: type }))
  } catch (error) {
    console.error('加载字典类型失败:', error)
  }
}

// 加载字典项
const loadDictionaryItems = async () => {
  try {
    const items = await $fetch('/api/dictionaries', {
      query: selectedDictType.value ? { type: selectedDictType.value } : {}
    })
    dictItems.value = items
  } catch (error) {
    console.error('加载字典项失败:', error)
  }
}

// 打开添加模态框
const openAddModal = () => {
  newDictItem.value = {
    type: selectedDictType.value || '',
    key: '',
    value: '',
    description: ''
  }
  isAddModalOpen.value = true
}

// 打开编辑模态框
const openEditModal = (item: DictItem) => {
  editingDictItem.value = { ...item }
  isEditModalOpen.value = true
}

// 添加字典项
const addDictItem = async () => {
  try {
    await $fetch('/api/dictionaries', {
      method: 'POST',
      body: newDictItem.value
    })
    // 关闭模态框
    isAddModalOpen.value = false
    // 刷新数据
    await loadDictionaryItems()
    await loadDictTypes()
  } catch (error) {
    console.error('添加字典项失败:', error)
  }
}

// 更新字典项
const updateDictItem = async () => {
  try {
    await $fetch(`/api/dictionaries/${editingDictItem.value.id}`, {
      method: 'PUT',
      body: editingDictItem.value
    })
    // 关闭模态框
    isEditModalOpen.value = false
    // 刷新数据
    await loadDictionaryItems()
  } catch (error) {
    console.error('更新字典项失败:', error)
  }
}

// 删除字典项
const deleteDictItem = async (id: number) => {
  if (confirm('确定要删除这个字典项吗？')) {
    try {
      await $fetch(`/api/dictionaries/${id}`, {
        method: 'DELETE'
      })
      // 刷新数据
      await loadDictionaryItems()
      await loadDictTypes()
    } catch (error) {
      console.error('删除字典项失败:', error)
    }
  }
}

// 页面加载时初始化数据
onMounted(async () => {
  await loadDictTypes()
  await loadDictionaryItems()
})
</script>