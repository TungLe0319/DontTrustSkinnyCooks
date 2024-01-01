<script lang="ts" setup>
import SectionHeader from '../globals/SectionHeader.vue'
import RecipeCard from '~/components/globals/RecipeCard.vue'
import type { RecipeWithUserAndCategories } from '~/types/types'

const { data }
  = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const recipes = data.value?.slice(0, 6)
</script>

<template>
  <div class=" ">
    <SectionHeader title="Recommended By Us" />
    <div class="grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in recipes" :recipe="recipe" />
    </div>
  </div>
</template>

<style></style>
