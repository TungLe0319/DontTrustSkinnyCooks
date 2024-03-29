<script lang="ts" setup>

import type { Category, Prisma } from '@prisma/client';
import SectionHeader from '../globals/SectionHeader.vue'
import RecipeCard from '~/components/globals/RecipeCard.vue'

const { data: Recipes } = await useFetch<Prisma.RecipeGetPayload<{
  include: {
    categories: true
    user: true
  }
}>[]>('/api/recipes')

// Ensure that Recipes.value is an array of the expected type
const recipes = ref(Recipes.value)

const { data: Categories } = await useFetch<Category[]>('/api/categories', {
  method: 'GET',
})

const includedCategories = ['Dairy-Free', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Nut-Free', 'Keto-Friendly']
const categories = Categories.value?.filter(c => includedCategories.includes(c.name))

const selectedCategory = ref<string | null>(null)

function filterRecipes() {
  if (selectedCategory.value) {
    recipes.value = Recipes.value?.filter((recipe: any) => {
      return recipe.categories.some((category: any) => category.name === selectedCategory.value)
    })?.slice(0, 6) ?? []
  }
  else {
    recipes.value = Recipes.value?.slice(0, 6) ?? []
  }
}

const allCategoryName = 'All' // Assuming "All" is the name for displaying all recipes

// Add "All" category to the beginning of the categories list
categories?.unshift({ id: 123124124, name: allCategoryName })

function selectCategory(categoryName: string) {
  if (categoryName === allCategoryName)
    selectedCategory.value = null // Reset filter for "All"
  else
    selectedCategory.value = categoryName

  filterRecipes()
}
</script>

<template>
  <div class="">
    <SectionHeader title="Recipes Based On Dietary Preferences" />

    <div class="mb-5 mt-2 flex items-center justify-center gap-3 flex-wrap">
      <UButton v-for="category in categories" :key="category.id" @click="selectCategory(category.name)">
        {{ category.name }}
      </UButton>
    </div>

    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="3"
      :loop="true"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"

      class="w-full h-[500px] "
    >
      <SwiperSlide v-for="recipe in recipes" :key="recipe.id" v-auto-animate class="mx-2">
        <RecipeCard :recipe="recipe" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style></style>
