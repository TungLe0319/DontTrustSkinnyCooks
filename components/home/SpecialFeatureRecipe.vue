<script lang="ts" setup>
import type { RecipeWithUserAndCategories } from '~/types/types'

const { data } = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const recipe = data.value?.[6]
</script>

<template>
  <div
    class=" hero-image   flex items-center justify-center border-4 w-full border-primary  relative  py-24 text-center"
    :style="{ backgroundImage: `url('${recipe?.image}')` }"
  >
    <div class=" p-5 w-1/2 h-full z-10 flex flex-col space-y-3 group backdrop-blur-sm rounded border-2 border-white/20">
      <span class="drop-shadow text-white font-extrabold text-3xl group-hover:underline-offset-4 group-hover:underline"> Special Feature Recipe!
      </span>
      <span class="drop-shadow text-white font-extrabold text-3xl group-hover:underline-offset-4 group-hover:underline"> {{ recipe?.title }} </span>
      <span class="drop-shadow text-white text-xl  ">
        Revolutionize Your Rice: The Ultimate Fried Rice Mastery
      </span>
      <span class="drop-shadow text-white   ">
        Embark on a journey to culinary excellence with our featured Fried Rice recipes. From classic comfort to exotic twists, discover the secrets of crafting the perfect fried rice dish. Elevate your home-cooked meals with techniques that promise flavor-packed bites and the satisfaction of becoming a wok virtuoso.
      </span>
    </div>
    <div
      class="absolute z-40 -top-9 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 shadow-md border-2 border-orange-300 hover:shadow-xl transition-all duration-150 "
    >
      <Icon name="game-icons:fat" class="text-orange-400 text-6xl" />
    </div>
    <div class="bg-black/40 absolute w-full h-full" />
  </div>
</template>

<style scoped>
.hero-image {
  height: 65vh;
  /* always scale the image to the appropriate size of your screen */
  background-size: cover;

  background-position: center;
  /* keeps the image fixed while scrolling , neat effect. */
  background-attachment: fixed;

}
</style>
