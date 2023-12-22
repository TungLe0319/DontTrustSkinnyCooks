<template>
  <div class="">
    <div class=" flex items-center justify-center  my-5 ">
     <span class="font-extrabold text-4xl text-center ">
       Five-Star Feasting
     </span>
     <Icon name="uil:arrow-right" class="text-4xl text-orange-400"/>
    </div>
    <div class=" grid grid-cols-3 gap-4">
      <RecipeCard v-for="recipe in recipes" :recipe="recipe"/>

   
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '~/types/types';
import RecipeCard from '../recipes/recipe-home/RecipeCard.vue';
const { data } = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes/get')

const recipes = data.value?.slice(0,6)
</script>

<style>

</style>