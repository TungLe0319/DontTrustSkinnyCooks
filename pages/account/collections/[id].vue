<template>
  <div class="space-y-5">
 
  <h1 class="text-6xl font-extrabold underline underline-offset-4"> {{ collection?.title }} </h1>

  <div class="space-y-3">
 <p class="text-sm">
  Created: {{ formateDate(collection?.createdAt!).value }}
  </p>

  </div>
 <div class=" grid grid-cols-4 gap-5">
  <RecipeCard v-for="recipe in collection?.recipes" :key="recipe.id" :recipe="recipe" />
 </div>
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/recipe-home/RecipeCard.vue'
import type { Collection,CollectionWithUserAndRecipes } from '~/types/types';
const toast = useToast()
const route = useRoute()
const {data} = useFetch<CollectionWithUserAndRecipes>(`/api/account/collections/${route.params.id}`)
const collection = ref(data.value)
</script>

<style>

</style>