<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue'
import Directions from '~/components/recipes/recipe-id/Directions.vue'
import Ingredients from '~/components/recipes/recipe-id/Ingredients.vue'
import MainInfo from '~/components/recipes/recipe-id/MainInfo.vue'
import Notes from '~/components/recipes/recipe-id/Notes.vue'
import PrepCookServingYield from '~/components/recipes/recipe-id/PrepCookServingYield.vue'
import Reviews from '~/components/recipes/recipe-id/Reviews.vue'
import AdBannerOne from '~/components/home/AdBannerOne.vue'
import useAverageRating from '~/composables/appState'

const route = useRoute()
const router = useRouter()
const { data, pending, error } = await useFetch<Prisma.RecipeGetPayload<{
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
}>>(`/api/recipes/${route.params.id}`, {
  method: 'GET',
})
const recipe = ref(data.value)

const { averageRating } = useAverageRating(recipe?.value?.reviews || [])

onMounted(() => {
  if (!recipe.value) {
    router.replace('/404') // Replace with the actual path to your 404 page
  }
})
</script>

<template>
  <main   class="flex   justify-center gap-3 min-h-screen">
    <div v-if="pending" class="text-center w-full p-5 min-h-screen">
      <LoadingSpinner />
    </div>
  
    <div v-else-if="recipe" class="w-2/3  p-5 space-y-10">
      <MainInfo :average-rating="averageRating" :recipe="recipe" />
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
      <div class="sticky top-5">
        <AdBannerOne />
      </div>
    </div>
  </main>
</template>

<style></style>
