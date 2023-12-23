<template>
  <div class="">
    <div class="mt-5 mb-14 flex items-center justify-center">
      <span class="text-center text-4xl font-extrabold underline underline-offset-4">
        Five-Star Feasting
      </span>
      <Icon name="uil:arrow-right" class="text-4xl text-orange-400" />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in recipes" :recipe="recipe" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from "~/types/types";
import RecipeCard from "../recipes/recipe-home/RecipeCard.vue";
const { data } =
  await useFetch<RecipeWithUserAndCategories[]>("/api/recipes/get");

const recipes = data.value?.slice(0, 6);
</script>

<style></style>
