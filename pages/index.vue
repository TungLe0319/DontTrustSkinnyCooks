<script lang="ts" setup>
import AdBannerOne from '~/components/home/AdBannerOne.vue';
import FeaturedRecipes from '~/components/home/FeaturedRecipes.vue';
import HeroVersionTwo from '~/components/home/HeroVersionTwo.vue';
import SpecialFeatureRecipe from '~/components/home/SpecialFeatureRecipe.vue';
import TeamAndContributors from '~/components/home/TeamAndContributors.vue';
import Hero from '~/components/index/Hero.vue'
import RecommendedRecipes from '~/components/home/RecommendedRecipes.vue'
// async function seedCategories() {
//   await useFetch('/api/categories/seed')
// }
</script>

<template>
  <main class="min-h-screen py-16 space-y-24">
    <!-- <Hero /> -->
    <HeroVersionTwo/>
<div class=" space-y-24">
      <AdBannerOne/>
  <FeaturedRecipes/>
  <TeamAndContributors/>
</div>
<RecommendedRecipes />
<SpecialFeatureRecipe/>
    <!-- <button @click="seedCategories">Seed Categories</button> -->
  </main>
</template>

<style>

</style>
