<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import SectionHeader from '../globals/SectionHeader.vue'
import RecipeCard from '~/components/globals/RecipeCard.vue'
import useAverageRating from '~/composables/appState'

const { data }
  = await useFetch<Prisma.RecipeGetPayload<{
    include: {
      user: true
      categories: true
      reviews: true
    }
  }>[]>('/api/recipes',{method:'GET'})

const recipes = data.value?.slice(0, 6)

const fiveStarRecipes = data.value?.filter(recipe => useAverageRating(recipe.reviews).averageRating.value > 2)
</script>

<template>
  <div class="">
    <SectionHeader title="Highly Rated Feasting" />
    <!-- <div class="" v-for="f in fiveStarRecipes">
  {{ useAverageRating(f.reviews)}}
</div> -->
    <div class="grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in fiveStarRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<style></style>
