<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '../../types/types'
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue'
import Directions from '~/components/recipes/recipe-id/Directions.vue'
import Ingredients from '~/components/recipes/recipe-id/Ingredients.vue'
import MainInfo from '~/components/recipes/recipe-id/MainInfo.vue'
import Notes from '~/components/recipes/recipe-id/Notes.vue'
import PrepCookServingYield from '~/components/recipes/recipe-id/PrepCookServingYield.vue'
import Reviews from '~/components/recipes/recipe-id/Reviews.vue'
import AdBannerOne from '~/components/home/AdBannerOne.vue'

const route = useRoute()

const { data, pending, error } = await useFetch<RecipeWithUserAndCategories>(`/api/recipes/${route.params.id}`, {
  method: 'GET',
})
const recipe = ref(data.value)
</script>

<template>
  <main class="flex   justify-center gap-3 min-h-screen">
    <div v-if="pending" class="text-center w-full p-5 min-h-screen">
      <LoadingSpinner />
    </div>
    <div v-else-if="error" class="text-center w-full p-5">
      {{ error.value?.message || '' }}
      Error fetching data. Please try again later.
    </div>
    <div v-if="recipe" class="w-2/3  p-5 space-y-10">
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
      <AdBannerOne />
    </div>
  </main>
</template>

<style></style>
