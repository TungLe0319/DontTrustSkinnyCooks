<script lang="ts" setup>
import Directions from '~/components/recipes/recipe-id/Directions.vue'
import Ingredients from '~/components/recipes/recipe-id/Ingredients.vue'
import MainInfo from '~/components/recipes/recipe-id/MainInfo.vue'
import Notes from '~/components/recipes/recipe-id/Notes.vue'
import PrepCookServingYield from '~/components/recipes/recipe-id/PrepCookServingYield.vue'
import Reviews from '~/components/recipes/recipe-id/Reviews.vue'
import {Prisma} from '@prisma/client'
import type {RecipeWithUserAndCategories} from '../../types/types'
const route = useRoute()

const { data } = await useFetch<RecipeWithUserAndCategories>(`/api/recipes/${route.params.id}`)
const recipe = data.value
</script>

<template>
  <main v-if="recipe" class="flex   justify-center gap-3">
    <div class="w-2/3  p-5 space-y-10">
      <MainInfo :id="recipe.id" :title="recipe.title" :description="recipe.description" :user="recipe.user" :created-at="recipe.createdAt" :updated-at="recipe.updatedAt" />
      <hr>
      <div class="">
        <img :src="recipe.image || ''" :alt="recipe.title" class="object-cover w-full   h-full shadow-xl rounded">
      </div>
      <hr>
      <PrepCookServingYield
        :prep-time="recipe.prepTime" :cook-time="recipe.cookTime" :serving-size="recipe.servingSize"
        :yield-amount="recipe.yieldAmount"
      />
      <hr>
      <Ingredients :ingredients="recipe.ingredients" />
      <hr class="">
      <Directions :directions="recipe.directions" />
      <hr>
      <Notes :notes="recipe.notes" />
      <hr class="my-3">
      <Reviews :recipe="recipe" />
    </div>
    <div class="w-1/3  pt-5">
      <div class="p-2 bg-gray-100 dark:bg-gray-800 shadow-xl sticky top-5 rounded ">
        <span class="text-3xl font-extrabold">Advertisement Two</span>
        <img
          src="https://images.unsplash.com/photo-1557858310-9052820906f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="advertisement building" class=" rounded object-cover"
        >
      </div>
    </div>
  </main>
</template>

<style></style>
