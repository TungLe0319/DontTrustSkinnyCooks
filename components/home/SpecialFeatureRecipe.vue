<template>
  <div
    class=" hero-image   flex items-center justify-center border-y-4 w-full border-orange-300  relative p-10 text-center" :style="{ backgroundImage: `url('${recipe?.image}')` }">
  

<div class="">
  
</div>

    <div
      class="absolute z-40 -top-9 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 shadow-md border-2 border-orange-300 hover:shadow-xl transition-all duration-150 ">
      <Icon v-motion-pop-visible name='ph:flower-lotus' class="text-amber-400 text-6xl" />
    </div>
    <div class="bg-black/40 absolute w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '~/types/types';

const {data} = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes/get')

const recipe = data.value?.[6]
</script>

<style scoped>
.hero-image {
  height: 50vh;
  /* always scale the image to the appropriate size of your screen */
  background-size: cover;

  background-position: center;
  /* keeps the image fixed while scrolling , neat effect. */
  background-attachment: fixed;

}
</style>