<script lang="ts" setup>
import SectionHeader from '../globals/SectionHeader.vue'
import RecipeCard from '~/components/globals/RecipeCard.vue'
import type { RecipeWithUserAndCategories } from '~/types/types'

const { data }
  = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes')

const recipes = data.value?.slice(0, 6)
const recipesStuff = ref(data.value)
</script>

<template>
  <div class="">
    <SectionHeader title="Recipes Based On Dietary Preferences" />
  

     <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="4"
      :loop="true"
 
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"

      class="w-full "
    >
      <SwiperSlide v-for="recipe in recipesStuff" :key="recipe.id" class="mx-2">
         <RecipeCard :recipe="recipe" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style></style>
