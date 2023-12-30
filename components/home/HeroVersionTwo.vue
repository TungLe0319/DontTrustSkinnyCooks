<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '~/types/types'

const { data: Recipes }
  = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const { data: MainRecipe } = await useFetch<RecipeWithUserAndCategories>(`/api/recipes/${4}`, {
  method: 'GET',
})
const mainRecipe = Recipes.value?.find(recipe => recipe.id === 2)
const { data: mostRecentRecipes } = await useFetch('/api/recipes/home/mostRecent')
</script>

<template>
  <div class="flex gap-6 bg-gray-100 dark:bg-gray-800 p-10 rounded">
    <NuxtLink :to="`/recipes/${mainRecipe?.id}`" class="w-2/3 group ">
      <div class=" mb-5  underline underline-offset-4 text-4xl font-extrabold ">
        What's Cooking
      </div>

      <img
        :src="MainRecipe?.image || ''"
        alt=""
        class="h-auto w-auto rounded-md shadow-lg group-hover:brightness-75 duration-150 transition-all"
      >
      <div class="mt-5 space-y-3">
        <div class="flex gap-3">
          <UBadge
            v-for="category in MainRecipe?.categories"
            :key="category.id"
            size="md"
            class="bg-orange-400 shadow-md"
          >
            {{ category.name }}
          </UBadge>
        </div>
        <div class="text-3xl font-extrabold group-hover:underline group-hover:underline-offset-4">
          {{ MainRecipe?.title }}
        </div>
        <p class="group-hover:underline group-hover:underline-offset-4 text-gray-500 dark:text-gray-400">
          {{ MainRecipe?.description }}
        </p>
      </div>
    </NuxtLink>
    <div class="w-1/3 ">
      <div class="space-y-5 bg-gray-200 dark:bg-gray-700 p-2 rounded shadow-sm">
        <div
          class="text-center text-2xl font-extrabold underline underline-offset-4"
        >
          Latest Recipes
        </div>
        <div class="space-y-6">
          <NuxtLink
            v-for="recipe in mostRecentRecipes"
            :key="recipe.id"
            :to="`/recipes/${recipe.id}`"
            class="group flex gap-5 rounded p-2 transition-all duration-150"
          >
            <img
              :src="recipe?.image || ''"
              alt=""
              class="h-24 w-1/2 rounded-md object-cover shadow-lg transition-all duration-150 group-hover:brightness-75"
            >
            <div class="flex flex-col w-2/3">
              <span class="font-bold underline-offset-2 group-hover:underline">{{ recipe.title }}
              </span>
              <span
                class="text-sm text-gray-500 dark:text-gray-400 underline-offset-2 group-hover:underline"
              >{{ recipe.description.slice(0, 50) }}...
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
