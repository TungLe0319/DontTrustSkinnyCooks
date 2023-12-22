<template>
  <div class="flex  gap-6 ">
<div class="w-2/3">
   <img :src="mainRecipe?.image || ''" alt="" class="w-auto h-auto shadow-lg rounded-md">
   <div class="space-y-3 mt-5">
    <div class="flex gap-3">
      <UBadge
      v-for="category in mainRecipe?.categories"
      :key="category.id"
      size="md"
        class="shadow-md  bg-orange-400"
     
      >
       {{ category.name }}
      </UBadge>
    </div>
    <div class="font-extrabold text-3xl">
      {{ mainRecipe?.title }}
    </div>
  <p>
    {{ mainRecipe?.description }}
  </p>
   </div>
</div>

<div class="w-1/3 ">
  <div class="p-2 bg-gray-100 space-y-5 ">
<div class="font-extrabold text-2xl text-center underline  underline-offset-4">
  Newest Recipes
</div>
<div class="space-y-6">
  <NuxtLink :to="`/recipes/${recipe.id}`" v-for="recipe in recipes" :key="recipe.id" class="flex p-2  group gap-5   transition-all duration-150 rounded">
    <img :src="recipe?.image || ''" alt="" class="w-full h-24 object-cover shadow-lg rounded-md group-hover:brightness-75 transition-all duration-150">
    <div class="  flex flex-col ">
      <span class="font-bold  group-hover:underline underline-offset-2 ">{{ recipe.title }} </span>
      
      <span class="text-sm font-medium group-hover:underline underline-offset-2">{{ recipe.description.slice(0,50) }}... </span>
    </div>
  </NuxtLink>
</div>
  </div>
</div>
  </div>
</template>

<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '~/types/types';
import RecipeCard from '../recipes/recipe-home/RecipeCard.vue';
const { data } = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes/get')

const recipes = data.value?.slice(0, 4)
const mainRecipe = data.value?.find((recipe) => recipe.id === 2)
</script>

<style></style>