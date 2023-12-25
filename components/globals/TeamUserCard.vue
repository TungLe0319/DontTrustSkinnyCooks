<script lang="ts" setup>
defineProps(['user'])
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center space-y-1">
    <img
      :src="user.image" alt="tung profile photo"
      class="rounded-full shadow-lg w-20 h-20 border-4 border-orange-400/50"
    >
    <p class="font-bold text-lg">
      {{ user.name }}
    </p>
    <p class="text-sm">
      {{ user.title }}
    </p>
    <div class="flex gap-2">
      <a :href="user.linkedIn">
        <Icon name="uil:linkedin" class="text-xl hover:text-orange-400 transition-all duration-150 hover:shadow-lg hover:scale-[1.2]" />
      </a>
      <a :href="user.facebook">
        <Icon name="uil:facebook" class="text-xl hover:text-orange-400 transition-all duration-150 hover:shadow-lg hover:scale-[1.2]" />
      </a>
      <a :href="user.instagram">
        <Icon name="uil:instagram" class="text-xl hover:text-orange-400 transition-all duration-150 hover:shadow-lg hover:scale-[1.2]" />
      </a>
    </div>
  </div>
</template>

<style>

</style>
