<script lang="ts" setup>
import type { Prisma } from '@prisma/client';
import SectionHeader from '../globals/SectionHeader.vue'
import RecipeCard from '~/components/globals/RecipeCard.vue'
import type { RecipeWithUserAndCategories } from '~/types/types'
import useAverageRating from '~/composables/appState';

const { data }
  = await useFetch<Prisma.RecipeGetPayload<{
    include:{
      user:true,
      categories:true,
      reviews:true
    }
  }>[]>('/api/recipes/home/fiveStarRecipes')

const recipes = data.value?.slice(0, 6)

const fiveStarRecipes = data.value


</script>

<template>
  <div class="">
    <SectionHeader title="Five-Star Feasting" />
<div class="" v-for="f in fiveStarRecipes?.filter(recipe => useAverageRating(recipe.reviews).averageRating.value > 3 )">
  {{ useAverageRating(f.reviews)}}
</div>
    <div class="grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<style></style>
