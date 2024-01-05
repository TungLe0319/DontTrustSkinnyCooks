<script lang="ts" setup>
import { ref } from 'vue';
import SectionHeader from '../globals/SectionHeader.vue';
import RecipeCard from '~/components/globals/RecipeCard.vue';
import type { Category, Prisma } from '@prisma/client';

const { data: Recipes } = await useFetch<Prisma.RecipeGetPayload<
{
  include: {
      user: true,
      categories: true,
      _count: {
        select: {
          reviews: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,

        },
      },
    },
}>[]>('/api/recipes');
const recipes = ref(Recipes.value);

const { data: Categories } = await useFetch<Category[]>('/api/categories', {
  method: 'GET',
});

const includedCategories = ["Christmas", "New Year's", "4th of July", "Easter", "Father's Day","Mother's Day","Halloween","Labor Day","Valentine's Day","Cinco De Mayo","St. Patrick's Day"];
const categories = Categories.value?.filter(c => includedCategories.includes(c.name));

const selectedCategory = ref<string | null>(null);

const filterRecipes = () => {
  if (selectedCategory.value) {
    recipes.value = Recipes.value?.filter(recipe => {
      return recipe.categories.some(category => category.name === selectedCategory.value);
    })?.slice(0, 6);
  } else {
    recipes.value = Recipes.value?.slice(0, 6);
  }
};

const allCategoryName = "All"; // Assuming "All" is the name for displaying all recipes

// Add "All" category to the beginning of the categories list
categories?.unshift({ id: 123124124, name: allCategoryName });

const selectCategory = (categoryName: string) => {
  if (categoryName === allCategoryName) {
    selectedCategory.value = null; // Reset filter for "All"
  } else {
    selectedCategory.value = categoryName;
  }
  filterRecipes();
};
</script>


<template>
  <div class="">
    <SectionHeader title="Recipes for the Holidays!" />
  
    <div class="mb-5 mt-2 flex items-center justify-center gap-3 flex-wrap">
        <UButton v-for="category in categories"   :key="category.id" @click="selectCategory(category.name)">
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
      <SwiperSlide v-auto-animate v-for="recipe in  recipes" :key="recipe.id" class="mx-2">
         <RecipeCard :recipe="recipe" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style></style>
