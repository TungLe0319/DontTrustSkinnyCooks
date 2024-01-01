<script lang="ts" setup>
defineProps({
  title: String,
  subtitle: String,
  image: String,
  icon: String,
})
</script>

<template>
  <div class="py-8 text-center space-y-4 flex flex-col items-center justify-center">
    <div class="text-3xl uppercase ">
      {{ title }}
    </div>
    <hr class="border-2 border-primary w-1/12">
  </div>
</template>

<style>

</style>
