
<template>
  <main class="min-h-screen  ">
    <h1 class="text-8xl font-extrabold  text-center  mt-16">Recipes</h1>
    <Search :data="data" />
    <div v-if="data" class="grid grid-cols-4  gap-6   pb-20 " v-auto-animate>
      <RecipeCard v-for="(recipe, index) in filteredRecipes" :key="index" :recipe="recipe" />
    </div>
    <div v-else>
      <h1 class="text-8xl font-extrabold text-center"> No Recipes</h1>
    </div>
  </main>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/recipe-home/RecipeCard.vue';
import Search from '~/components/recipes/recipe-home/Search.vue';

const { data } = await useFetch<RecipeWithUser[]>("/api/recipes/get");


const selectedCategories = useSelectedCategory();


const filteredRecipes = computed(() => {
  if (selectedCategories.value.length === 0) return data.value;

  return data.value?.filter((recipe) => {
    //@ts-ignore
    return recipe.categories?.some((category: any) =>
      selectedCategories.value.includes(category.name)
    );
  });
});





</script>

<style></style>