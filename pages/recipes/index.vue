<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '../../types/types'
import LazyRecipeCard from '~/components/globals/RecipeCard.vue';
import SearchFilters from '~/components/recipes/recipe-home/SearchFilters.vue'
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue'

const { data, pending, error } = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')
const selectedCategories = useFilterCategories()
const filterPrepTime = useFilterPrepTime()
const filterServingSize = useFilterServingSize()

const filteredRecipes = computed(() => {
  return data.value?.filter((recipe) => {
    // Check selected categories
    const categoryFilter
      = selectedCategories.value.length === 0
      || recipe.categories?.some(category =>
        selectedCategories.value.includes(category.name),
      )

    // Check prep time
    const prepTimeFilter
      = filterPrepTime.value === 0 // If filterPrepTime is 0, don't filter by prep time
      || (recipe.prepTime
      && Number.parseInt(recipe.prepTime.split(' ')[0], 10) <= filterPrepTime.value)

    // Check serving size
    const servingSizeFilter
      = filterServingSize.value === 0 // If filterServingSize is 0, don't filter by serving size
      || (recipe.servingSize && recipe.servingSize <= filterServingSize.value)

    // Combine filters
    return categoryFilter && prepTimeFilter && servingSizeFilter
  })
})
</script>

<template>
  <main class="min-h-screen   ">
    <h1 class="text-8xl font-extrabold  text-center ">
      Recipes
    </h1>
    <SearchFilters :data="data" />
    <div v-if="!pending" v-auto-animate class="grid grid-cols-4  gap-6   pb-20 ">
      <LazyRecipeCard v-for="(recipe, index) in filteredRecipes" :key="index" :recipe="recipe" />
    </div>
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <p class="text-5xl font-bold text-center">
        Error loading recipes
      </p>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </main>
</template>

<style></style>
