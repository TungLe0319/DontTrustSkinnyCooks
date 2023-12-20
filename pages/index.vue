<template>
  <main class="min-h-screen">
    <Hero/>

<button @click="seedCategories">Seed Categories</button>
  </main>
</template>

<script lang="ts" setup>
import Hero from '~/components/index/Hero.vue';
const seedCategories = async () => {
 await useFetch('/api/categories/seed')
}

</script>

<style>

</style>