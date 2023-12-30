<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '../../types/types'
import RecipeCard from '~/components/recipes/recipe-home/RecipeCard.vue'
import Search from '~/components/recipes/recipe-home/Search.vue'
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue';
const { data,pending,error } = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const selectedCategories = useSelectedCategory()

const filteredRecipes = computed(() => {
  if (selectedCategories.value.length === 0)
    return data.value

  return data.value?.filter((recipe) => {
    return recipe.categories?.some(category =>
      selectedCategories.value.includes(category.name),
    )
  })
})
</script>

<template>
  <main class="min-h-screen   ">
    <h1 class="text-8xl font-extrabold  text-center ">
      Recipes
    </h1>
    <Search :data="data" />
    <div v-if="!pending" v-auto-animate class="grid grid-cols-4  gap-6   pb-20 ">
      <RecipeCard v-for="(recipe, index) in filteredRecipes" :key="index" :recipe="recipe" />
    </div>
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <p class="text-5xl font-bold text-center">
        Error loading recipes
      </p>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
     <LoadingSpinner/>
    </div>
  </main>
</template>

<style></style>
