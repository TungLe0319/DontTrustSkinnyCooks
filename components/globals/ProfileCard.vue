<template>
  <NuxtLink :to="`/profile/${user.id}`" class="flex items-center gap-2 p-2 rounded shadow-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300">
    <UAvatar :src="user.image" size="sm" class="shadow-md" />
    <div class="flex flex-col gap-1">
      <span class="text-sm w-fit font-bold border-b border-spacing-2 border-orange-400 text-gray-900">{{ user.name }}</span>
      <span class="text-sm text-gray-500">{{ user.email }}</span>
      
    </div>
  </NuxtLink>

</template>

<script lang="ts" setup>
const {user } =defineProps(['user'])


</script>

<style>

</style>