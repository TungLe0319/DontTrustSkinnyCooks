<script lang="ts" setup>
import RecipeCard from '~/components/globals/RecipeCard.vue'
import type { CollectionWithUserAndRecipes } from '~/types/types'
import LoadingSpinner from '~/components/globals/LoadingSpinner.vue'

const toast = useToast()
const route = useRoute()
const collection = computed(()=> Collection.value)
const { data:Collection, error, pending,refresh } = useFetch<CollectionWithUserAndRecipes>(`/api/account/collections/${route.params.id}`)

// // Had to do onMounted because the data was having hydration issues
// onMounted(async () => {
//   collection.value = data.value
// })
async function removeRecipeFromCollection(recipeId: number) {
  try {
    await useFetch(`/api/account/collections/${route.params.id}`, {
      method: 'PUT',
      body: {
        recipeId,
      },
    })
    toast.add({
      title: 'Recipe Removed',
      timeout: 3000,
      description: 'You can view your saved recipes in your profile.',
      icon: 'i-heroicons-bookmark-20-solid',
      color:'green'
    })
    refresh()
  }
  catch (error) {

  }
}
</script>

<template>
  <main v-if="collection" class="space-y-5 py-5 min-h-screen">
    <h1 class="text-6xl font-extrabold underline underline-offset-4">
      {{ collection?.title }}
    </h1>

    <div class="space-y-3">
      <p class="text-sm">
        Created: {{ formateDate(collection?.createdAt!).value }}
      </p>
    </div>
    <div v-if="collection?.recipes?.length >= 1" class=" grid grid-cols-4 gap-5">
     <div  v-for="recipe in collection?.recipes" :key="recipe.id"  class="relative">

       <RecipeCard :recipe="recipe" />
        <div class="absolute top-0 right-0">
          <UButton @click="removeRecipeFromCollection(recipe.id)">
            Remove
          </UButton>
          </div>
     </div>
    </div>
    <div v-else class="">
      <p class="text-5xl  mb-5">
        No recipes in this collection
      </p>
      <img src="../../../assets/images/undraw_empty.svg" alt="" class="w-auto h-[50vh] object-fit">
    </div>
  </main>
  <main v-else-if="error" class=" flex items-center justify-center  min-h-screen">
    <p class="text-5xl font-bold text-center">
      Error loading collection
    </p>
  </main>
  <main v-else class="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </main>
</template>

<style>

</style>
