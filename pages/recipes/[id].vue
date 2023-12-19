<template>
  <main v-if="recipe" class="flex   justify-center gap-3">
 <div class="w-1/2  p-5 space-y-5">
   <div class=" space-y-4">
        <h1 class="text-5xl font-extrabold mb-5">
          {{ recipe?.title }}
        </h1>
        <div class="flex gap-0.5 ">
          <Icon v-for="(rating, index) in 5" :key="rating" name="game-icons:fat" class="text-xl" />
        </div>
        <p class=" my-5">
          {{ recipe?.description }}
        </p>
        <div class="flex gap-4">
          <p>
            by
          </p>
          <NuxtLink :to="`profiles/${recipe.user?.username}`"
            class=" font-extrabold border-b  border-spacing-3 border-orange-400">
            {{ recipe.user.username }}
          </NuxtLink>
          <span> |</span>
          <p class="text-gray-500">Created 12/24/2023 </p>
        </div>
          <div class="flex   bg-gradient-to-r from-orange-500 via-rose-300 to-indigo-600 w-fit shadow-xl ">
        <UButton :ui="{ rounded: 'rounded-none' }" size="xl"  icon="i-heroicons-heart" :trailing="true"  class="bg-transparent hover:bg-black/20 transition-all duration-150">Save</UButton>
        <UButton :ui="{ rounded: 'rounded-none' }" size="xl"  icon="i-heroicons-star" :trailing="true" class="bg-transparent hover:bg-black/20 transition-all duration-150">Rate</UButton>
        <UButton :ui="{ rounded: 'rounded-none' }" size="xl"  icon="i-heroicons-share" :trailing="true" class="bg-transparent hover:bg-black/20 transition-all duration-150">Share</UButton>

      </div>

    </div>

  <hr>
    <div class="">
      <img :src="recipe.image" :alt="recipe.title" class="object-cover w-full   h-full shadow-xl">
    </div>

<hr>
    <div class="shadow-xl p-2 rounded bg-slate-200 grid grid-cols-2 gap-5 w-1/2">
      <div class="flex gap-3">
        <div class="">
          <p class="font-extrabold">Prep Time:</p>
          <p> {{ recipe.prepTime }} </p>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="">
          <p class="font-extrabold">Cook Time:</p>
          <p> {{ recipe.cookTime }} </p>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="">
          <p class="font-extrabold">Serving Size:</p>
          <p> {{ recipe.servingSize}} </p>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="">
          <p class="font-extrabold">Yield Size:</p>
          <p> {{ recipe.yield}} </p>
        </div>
      </div>
    </div>
 <hr>
    <div class="">
      <h2 class="text-3xl font-extrabold">Ingredients</h2>
      <ul class="">
        <li class="" v-for="ingredient in recipe.ingredients.split(',')">
  {{ ingredient }}
        </li>
      </ul>
    </div>

    <hr class="">
    <div class="">
        <h2 class="text-3xl font-extrabold">Directions</h2>
        <ul class="">
          <li class="flex flex-col my-3" v-for="(direction, index) in recipe.directions.split(',')">
  <span class="font-extrabold">Step {{ index+1 }} </span>

  <span>
    {{ direction }}
  </span>
          </li>
        </ul>
      </div>
      <hr>
   <div class="">
          <h2 class="text-3xl font-extrabold">Extra Notes</h2>
          <ul class="">
            <li class="flex flex-col my-3" v-for="(note, index) in recipe.notes.split(',')">
    <span class="font-extrabold">Note {{ index+1 }} </span>

    <span>
      {{ note }}
    </span>
            </li>
          </ul>
        </div>

 </div>
 <div class="w-1/3 ">
  <div class="p-2 bg-gray-100 shadow-xl sticky top-5 ">
    Ad Here
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, est.
  </div>
 </div>
  </main>
</template>

<script lang="ts" setup>
import type { Recipe } from '@prisma/client'
const store = useMyRecipesStore()
const route = useRoute()
const recipe = ref(null)
const getRecipeData = async () => {
  try {
    const id = parseInt(route.query.id as string)
    const res = await store.fetchRecipe(route.query.id as string)
    // console.log(res);
    if (res) {
      recipe.value = res
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getRecipeData()
})
</script>

<style></style>