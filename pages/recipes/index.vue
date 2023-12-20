
<template>
  <main class="min-h-screen  ">
    <h1 class="text-8xl font-extrabold  text-center ">Recipes</h1>
    <div class=" my-14">
     
 
   <USelectMenu
   v-if="data"
      v-model="selected"
      :options="data "
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
            <div class="flex gap-5 items-center">
              <span class="truncate">{{ data.title }}</span>
              <span class="text-xs">
                {{ data.user.name }}
              </span>
            </div>
            <span class="truncate text-sm">{{ data.description }}</span>

        </div>
     
      </NuxtLink>
      </template>
    </USelectMenu>
    </div>
    <div  class="grid grid-cols-3  gap-10   ">
      <RecipeCard v-for="(recipe, index) in data" :key="index" :recipe="recipe" />
    
    </div>
   <!-- <div >
    <h1 class="text-8xl font-extrabold text-center"> No Recipes</h1>
   </div> -->
  </main>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/RecipeCard.vue';
import type { Recipe } from '@prisma/client'
// const data = ref<RecipeWithUser[]>([])

const {data} = await useFetch<RecipeWithUser[]>("/api/recipes/get");

  const selected = ref(data.value?.[0] )









</script>

<style></style>