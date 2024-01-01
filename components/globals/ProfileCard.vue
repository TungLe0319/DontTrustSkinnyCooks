<script lang="ts" setup>
const { user } = defineProps(['user'])
</script>

<template>
  <NuxtLink :to="`/profile/${user.id}`" class="flex items-center gap-2 p-2 rounded shadow-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300">

   
    <UAvatar :src="user.image" size="sm" class="shadow-md" />
    <div class="flex flex-col gap-1">
      <span class="text-sm w-fit font-bold border-b border-spacing-2 border-primary text-gray-900 dark:text-gray-300">{{ user.name }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</span>
    </div>
  </NuxtLink>
</template>

<style>

</style>
