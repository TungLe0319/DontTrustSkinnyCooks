<template>
  <div class="flex gap-6">
    <div class="w-2/3">
      <img
        :src="mainRecipe?.image || ''"
        alt=""
        class="h-auto w-auto rounded-md shadow-lg"
      />
      <div class="mt-5 space-y-3">
        <div class="flex gap-3">
          <UBadge
            v-for="category in mainRecipe?.categories"
            :key="category.id"
            size="md"
            class="bg-orange-400 shadow-md"
          >
            {{ category.name }}
          </UBadge>
        </div>
        <div class="text-3xl font-extrabold">
          {{ mainRecipe?.title }}
        </div>
        <p>
          {{ mainRecipe?.description }}
        </p>
      </div>
    </div>
    <div class="w-1/3">
      <div class="space-y-5 bg-gray-100 p-2">
        <div
          class="text-center text-2xl font-extrabold underline underline-offset-4"
        >
          Newest Recipes
        </div>
        <div class="space-y-6">
          <NuxtLink
            :to="`/recipes/${recipe.id}`"
            v-for="recipe in recipes"
            :key="recipe.id"
            class="group flex gap-5 rounded p-2 transition-all duration-150"
          >
            <img
              :src="recipe?.image || ''"
              alt=""
              class="h-24 w-full rounded-md object-cover shadow-lg transition-all duration-150 group-hover:brightness-75"
            />
            <div class="flex flex-col">
              <span class="font-bold underline-offset-2 group-hover:underline"
                >{{ recipe.title }}
              </span>
              <span
                class="text-sm font-medium underline-offset-2 group-hover:underline"
                >{{ recipe.description.slice(0, 50) }}...
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from "~/types/types";
import RecipeCard from "../recipes/recipe-home/RecipeCard.vue";
const { data } =
  await useFetch<RecipeWithUserAndCategories[]>("/api/recipes/get");

const recipes = data.value?.slice(0, 4);
const mainRecipe = data.value?.find((recipe) => recipe.id === 2);
</script>

<style></style>
