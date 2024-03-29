<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import SectionHeader from '../globals/SectionHeader.vue'
import type { RecipeWithUserAndCategories } from '~/types/types'

const { data: MainRecipe } = await useFetch<RecipeWithUserAndCategories>(`/api/recipes/${4}`, {
  method: 'GET',
})
const mainRecipe = ref(MainRecipe.value)

const { data: MostRecentRecipes } = await useFetch<Prisma.RecipeGetPayload<{
  include: {
    user: true
    categories: true
    _count: {
      select: {
        reviews: true
      }
    }
    reviews: {
      select: {
        id: true
        rating: true
      }
    }
  }
}>[]>('/api/recipes/home/mostRecent')
const mostRecentRecipes = ref(MostRecentRecipes.value)
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-800">
    <SectionHeader title="What's Cooking" />
    <div class="flex gap-6  p-10 rounded">
      <NuxtLink :to="`/recipes/${mainRecipe?.id}`" class="w-2/3 group ">
        <img
          :src="mainRecipe?.image || ''"
          alt=""
          class="h-auto w-auto rounded-md shadow-lg group-hover:brightness-75 duration-150 transition-all"
        >
        <div class="mt-5 space-y-3">
          <div class="text-3xl font-extrabold group-hover:underline group-hover:underline-offset-4">
            {{ mainRecipe?.title }}
          </div>
          <p class=" text-gray-500 dark:text-gray-400">
            {{ mainRecipe?.description }}
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
                  class="text-sm text-gray-500 dark:text-gray-400 underline-offset-2 "
                >{{ recipe.description.slice(0, 50) }}...
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
