<template>
  <UApp>
    <UContainer>
      <UCard class="mt-10">
        <template #header>
          <div class="flex justify-between items-center">
            <h1>宠物救助财务公示平台</h1>
            <UNavigationMenu :items="navigationItems" />
          </div>
        </template>
        <NuxtPage />
      </UCard>
    </UContainer>
  </UApp>
</template>

<script setup>
const navigationItems = [
  {
    label: '首页',
    to: '/'
  },
  {
    label: '财务报表',
    to: '/finance'
  },
  {
    label: '字典管理',
    to: '/dictionaries'
  }
]
</script>
