<script lang="ts" setup>
import RecipeCard from '~/components/globals/RecipeCard.vue';
import type { RecipeWithUserAndCategories } from '~/types/types'
import SectionHeader from '../globals/SectionHeader.vue';

const { data }
  = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const recipes = data.value?.slice(0, 6)
</script>

<template>
  <div class="">
    <SectionHeader title="Five-Star Feasting" />
  
    <div class="grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<style></style>
