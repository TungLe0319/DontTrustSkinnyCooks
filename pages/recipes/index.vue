
<template>
  <main class="min-h-screen p-20">
    <h1 class="text-8xl font-extrabold mb-4 text-center">Recipes</h1>
    <div class="grid grid-cols-3  gap-10   ">
      <RecipeCard v-if="data.length >= 0" v-for="(recipe, index) in data" :key="index" :recipe="recipe" />
    
    </div>
  </main>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/RecipeCard.vue';
import type { Recipe } from '@prisma/client'
const data = ref<Recipe[]>([])

const store = useMyRecipesStore()

const fetchRecipes = async () => {
  try {
    const res = await store.fetchRecipes()

//  console.log(res);
 
    if (res) {
      data.value = res
    }

  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
 await  fetchRecipes()
})

const recipes = [
  {
    id: 1,
    title: "Recipe 1",
    description: "This is recipe 1 description.",
    picture: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cookingTime: 15,
    servingSize: "2",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    rating: 4
  },
  {
    id: 2,
    title: "Recipe 2",
    description: "This is recipe 2 description.",
    picture: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cookingTime: 20,
    servingSize: "2",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    rating: 5
  },
  {
    id: 3,
    title: "Recipe 3",
    description: "This is recipe 3 description.",
    picture: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cookingTime: 30,
    servingSize: "2",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    rating: 4
  },
  {
    id: 4,
    title: "Recipe 4",
    description: "This is recipe 4 description.",
    picture: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cookingTime: 40,
    servingSize: "2",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    rating: 3
  },
  {
    id: 5,
    title: "Recipe 5",
    description: "This is recipe 5 description.",
    picture: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cookingTime: 60,
    servingSize: "2",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    rating: 5
  },
  // Add more recipes here...
];



</script>

<style></style>