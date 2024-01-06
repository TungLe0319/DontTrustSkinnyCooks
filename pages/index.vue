<script lang="ts" setup>
import AdBannerOne from '~/components/home/AdBannerOne.vue'
import FeaturedRecipes from '~/components/home/FeaturedRecipes.vue'
import WhatsCookingHeroSection from '~/components/home/WhatsCookingHeroSection.vue'
import SpecialFeatureRecipe from '~/components/home/SpecialFeatureRecipe.vue'
import TeamAndContributors from '~/components/home/TeamAndContributors.vue'
import RecommendedRecipes from '~/components/home/RecommendedRecipes.vue'
import AdBannerTwo from '~/components/globals/AdBannerTwo.vue'
import DietaryPreferences from '~/components/home/DietaryPreferences.vue'
import Holidays from '~/components/home/Holidays.vue'
import Cuisine from '~/components/home/Cuisine.vue'
</script>

<template>
  <main class="min-h-screen py-16 space-y-24">
    <WhatsCookingHeroSection />
    <div class=" space-y-24">
      <!-- <Cuisine/> -->
      <!-- <Holidays/> -->
      <AdBannerOne />
      <FeaturedRecipes />
      <TeamAndContributors />
      <DietaryPreferences/>
      <RecommendedRecipes />
      <SpecialFeatureRecipe />
      <AdBannerTwo  />
    </div>
  </main>
</template>

<style>

</style>
