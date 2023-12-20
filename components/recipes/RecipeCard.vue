<template>
 
   <NuxtLink :to="`recipes/${recipe.id}`"
          class=" shadow-xl hover:bg-zinc-800 hover:text-white  transition-all duration-300 group hover:shadow-2xl hover:shadow-black group dark:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:shadow-white/20">
          <div class="flex items-center mb-2 relative h-72 w-full overflow-hidden">
            <img :src="recipe.image || ''" alt="Recipe Picture"
              class="absolute w-full h-full object-cover shadow-2xl  transition-all duration-150  group-hover:grayscale">
            <div
              class="absolute flex items-start justify-center font-extrabold text-4xl w-full  p-10 z-10  translate-y-[20rem] group-hover:translate-y-[10rem] transition-all duration-300 text-white bg-gradient-to-t from-black via-black h-full">
              View Recipe
            </div>
          </div>
          <div class="p-5">
            <div class="flex flex-wrap gap-5">
              <h2 class="text-xl  font-extrabold">{{ recipe.title }} </h2>
              <!-- <div class="flex gap0.5">
              <Icon v-for="(rating,index) in recipe.rating" :key="rating" name="game-icons:fat" class="text-2xl" />
            </div> -->

            {{ recipe.user.username }}
            </div>

        
            <hr class="my-3">
            <div class="flex flex-wrap gap-2 justify-between ">
              <div class="flex gap-1">
                 <UTooltip text="Prep/Cook Time"  :popper="{ arrow: true }">
                   <Icon name="material-symbols:nest-clock-farsight-analog-rounded" class="text-3xl" />
                   <p class="mb-2 text-rose-400 font-bold">{{ recipe.prepTime }} </p>

                 </UTooltip>
              </div>
              <div class="flex gap-1">
                 <UTooltip text="Amount of Ingredients"  :popper="{ arrow: true }">

                   <Icon name="material-symbols:book-5" class="text-3xl" />
                   <p class="mb-2 text-rose-400 font-bold">{{ recipe.ingredients.length }} </p>
                 </UTooltip>
              </div>
              <div class="flex gap-1">
                 <UTooltip text="Serving Size"  :popper="{ arrow: true }">

                   <Icon name="ic:baseline-people" class="text-3xl" />
                   <p class="mb-2 text-rose-400 font-bold">{{ recipe.servingSize }} </p>
                 </UTooltip>
              </div>
            </div>
            <div class="my-2">
              <p class=" text-sm">{{ recipe.description }}</p>

          
            </div>
          </div>
        </NuxtLink>
</template>

<script lang="ts" setup>
import type { Recipe } from '@prisma/client'
defineProps(['recipe']);
</script>

<style></style>