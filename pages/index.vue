<script lang="ts" setup>
import Hero from '~/components/index/Hero.vue'

async function seedCategories() {
  await useFetch('/api/categories/seed')
}
</script>

<template>
  <main class="min-h-screen">
    <Hero />

    <!-- <button @click="seedCategories">Seed Categories</button> -->
  </main>
</template>

<style>

</style>
