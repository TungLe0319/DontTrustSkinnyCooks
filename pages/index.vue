<script lang="ts" setup>
import AdBannerOne from '~/components/home/AdBannerOne.vue'
import FeaturedRecipes from '~/components/home/FeaturedRecipes.vue'
import HeroVersionTwo from '~/components/home/HeroVersionTwo.vue'
import SpecialFeatureRecipe from '~/components/home/SpecialFeatureRecipe.vue'
import TeamAndContributors from '~/components/home/TeamAndContributors.vue'
import RecommendedRecipes from '~/components/home/RecommendedRecipes.vue'


</script>

<template>
  <main class="min-h-screen py-16 space-y-24">
   
    <HeroVersionTwo />
    <div class=" space-y-24">
      <AdBannerOne />
      <FeaturedRecipes />
      <TeamAndContributors />
         <RecommendedRecipes />
      <SpecialFeatureRecipe />
    </div>
 

  </main>
</template>

<style>

</style>
