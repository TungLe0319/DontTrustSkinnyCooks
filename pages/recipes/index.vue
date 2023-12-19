
<template>
  <main class="min-h-screen p-20">
    <h1 class="text-8xl font-extrabold mb-4 text-center">Recipes</h1>
    <div class="grid grid-cols-3  gap-10   ">
      <NuxtLink :to="`recipes/${recipe.id}`" v-for="recipe in recipes" :key="recipe.id"
        class=" shadow-xl hover:bg-zinc-800 hover:text-white  transition-all duration-300 group hover:shadow-2xl hover:shadow-black group">
        <div class="flex items-center mb-2 relative h-72 w-full overflow-hidden">
          <img :src="recipe.picture" alt="Recipe Picture" class="absolute w-full h-full object-cover shadow-2xl  transition-all duration-150  group-hover:grayscale">
          <div class="absolute flex items-start justify-center font-extrabold text-4xl w-full  p-10 z-10  translate-y-[20rem] group-hover:translate-y-[10rem] transition-all duration-300 text-white bg-gradient-to-t from-black via-black h-full">
            View Recipe
          </div>
        </div>
        <div class="p-5">
        <div class="flex flex-wrap gap-5">
            <h2 class="text-xl  font-extrabold">{{ recipe.title }} </h2>
            <div class="flex gap0.5">
              <Icon v-for="(rating,index) in recipe.rating" :key="rating" name="game-icons:fat" class="text-2xl" />
            </div>
        </div>
          <hr class="my-3">
          <div class="flex flex-wrap gap-2 justify-between ">
            <div class="flex gap-1">
              <Icon name="material-symbols:nest-clock-farsight-analog-rounded" class="text-3xl" />
              <p class="mb-2 text-rose-400 font-bold">{{ recipe.cookingTime }} </p>
            </div>
            <div class="flex gap-1">
              <Icon name="material-symbols:book-5" class="text-3xl" />
              <p class="mb-2 text-rose-400 font-bold">{{ recipe.ingredients.length }} </p>
            </div>
            <div class="flex gap-1">
              <Icon name="ic:baseline-people" class="text-3xl" />
              <p class="mb-2 text-rose-400 font-bold">{{ recipe.cookingTime }} </p>
            </div>
          </div>
         <div class="my-2">
           <p class=" text-sm">{{ recipe.description }}</p>
         </div>
        </div>
      
      </NuxtLink>
    </div>
  </main>
</template>

<script lang="ts" setup>
const recipes = [
  {
    id: 1,
    title: "Recipe 1",
    description: "This is recipe 1 description.",
    picture: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cookingTime: 15,
    servingSize: "2",
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    rating:4
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