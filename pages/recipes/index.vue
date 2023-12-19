
<template>
  <main class="min-h-screen px-20 ">
    <h1 class="text-8xl font-extrabold  text-center ">Recipes</h1>
    <div class=" my-14">
      
 
   <USelectMenu
   v-if="data"
      v-model="selected"
      :options="data"
      placeholder="Find a Recipe..."
      searchable
      searchable-placeholder="Search by title or description"
      option-attribute="title"
      by="id"
      size="xl"
      :search-attributes="['title', 'description']"
      
      :ui-menu="{option:{size:'text-xl',container:'w-full'},}"
    >
      <template #option="{ option: data}">
      
      <NuxtLink :to="`recipes/${data.id}`" class="flex gap-5 w-full  items-center ">
        <img :src="data.image" alt="" class="w-1/12 h-14 shadow-md rounded object-cover">
        <div class=" flex flex-col w-11/12">
            <span class="truncate">{{ data.title }}</span>
            <span class="truncate text-sm">{{ data.description }}</span>

        </div>
     
      </NuxtLink>
      </template>
    </USelectMenu>
    </div>
    <div  v-if="data.length >= 0" class="grid grid-cols-3  gap-10   ">
      <RecipeCard v-for="(recipe, index) in data" :key="index" :recipe="recipe" />
    
    </div>
   <div v-else >
    <h1 class="text-8xl font-extrabold text-center"> No Recipes</h1>
   </div>
  </main>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/RecipeCard.vue';
import type { Recipe } from '@prisma/client'
const data = ref<Recipe[]>([])


const selected = ref(data.value[0])
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




</script>

<style></style>