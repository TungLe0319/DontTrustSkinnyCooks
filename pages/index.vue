<script lang="ts" setup>
import AdBannerOne from '~/components/home/AdBannerOne.vue';
import FeaturedRecipes from '~/components/home/FeaturedRecipes.vue';
import HeroVersionTwo from '~/components/home/HeroVersionTwo.vue';
import Hero from '~/components/index/Hero.vue'

// async function seedCategories() {
//   await useFetch('/api/categories/seed')
// }
</script>

<template>
  <main class="min-h-screen py-16 space-y-10">
    <!-- <Hero /> -->
    <HeroVersionTwo/>
    <AdBannerOne/>
<FeaturedRecipes/>
    <!-- <button @click="seedCategories">Seed Categories</button> -->
  </main>
</template>

<style>

</style>
