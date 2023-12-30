<script lang="ts" setup>
import RecipeCard from '~/components/globals/RecipeCard.vue';
import type { RecipeWithUserAndCategories } from '~/types/types'

const { data }
  = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const recipes = data.value?.slice(0, 6)
</script>

<template>
  <div class=" ">
    <div class="mt-5 mb-14 flex items-center justify-center">
      <span class="text-center text-4xl font-extrabold underline underline-offset-4">
        Recommended by us
      </span>
      <Icon name="uil:arrow-right" class="text-4xl text-orange-400" />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in recipes" :recipe="recipe" />
    </div>
  </div>
</template>

<style></style>
