<script lang="ts" setup>
import RecipeCard from '~/components/recipes/recipe-home/RecipeCard.vue'
import Search from '~/components/recipes/recipe-home/Search.vue'
import {Prisma} from '@prisma/client'
const { data } = await useFetch< Prisma.RecipeGetPayload<{
  include: { user: true; categories: true };
}>[]>('/api/recipes/get')

const selectedCategories = useSelectedCategory()

const filteredRecipes = computed(() => {
  if (selectedCategories.value.length === 0)
    return data.value

  return data.value?.filter((recipe) => {
    
    return recipe.categories?.some((category: any) =>
      selectedCategories.value.includes(category.name),
    )
  })
})
</script>

<template>
  <main class="min-h-screen  ">
    <h1 class="text-8xl font-extrabold  text-center  mt-16">
      Recipes
    </h1>
    <Search :data="data" />
    <div v-if="data" v-auto-animate class="grid grid-cols-4  gap-6   pb-20 ">
      <RecipeCard v-for="(recipe, index) in filteredRecipes" :key="index" :recipe="recipe" />
    </div>
    <div v-else>
      <h1 class="text-8xl font-extrabold text-center">
        No Recipes
      </h1>
    </div>
  </main>
</template>

<style></style>
