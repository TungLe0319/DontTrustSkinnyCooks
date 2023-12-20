<template>
  <NuxtLink :to="`/recipes/${recipe.id}`"
    class=" shadow-xl hover:bg-zinc-800 hover:text-white  transition-all duration-300 group hover:shadow-2xl hover:shadow-black group dark:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:shadow-white/20">
    <div class="flex items-center mb-2 relative  w-full overflow-hidden" :class="route.name ==='profile-id' ? 'h-52': 'h-72'">
      <img :src="recipe.image || ''" alt="Recipe Picture"
        class="absolute w-full object-cover shadow-2xl  transition-all duration-150  group-hover:grayscale" :class="route.name === 'profile-id' ? 'h-42' : 'h-full'">
      <div
        class="absolute flex items-start justify-center font-extrabold text-4xl w-full  p-10 z-10  translate-y-[20rem] group-hover:translate-y-[10rem] transition-all duration-300 text-white bg-gradient-to-t from-black via-black h-full">
        View Recipe 

        
      </div>
    </div>
    <div class="p-5">
      <div class="flex flex-col gap-5">
        <h2 class="text-xl  font-extrabold">{{ recipe.title }} </h2>
     <div class="flex gap-3">
         <UPopover mode="hover" :ui="{ width: 'max-w-72' }">
           
              <UAvatar size="3xs" :src="recipe.user.image" alt="Avatar" />
              
           
            <template #panel>
              <div class="p-4 text-black z-50">
                <UAvatar size="xl" :src="recipe.user.image" alt="Avatar" class="shadow-md" />
                <p class="text-sm font-bold">{{ recipe.user.name }}</p>
                <p class="text-sm font-bold">{{ recipe.user.email }}</p>
                <a :href="recipe.user.instagram" class="text-sm">Instagram</a>
                <p class="text-sm">{{ recipe.user.facebook}}</p>
                <p class="text-sm">{{ recipe.user.facebook}}</p>
              </div>
            </template>
          </UPopover>
          <UPopover mode="hover" :ui="{ width: 'max-w-72' }">
          <Icon name="carbon:collapse-categories" class="text-xl" />
            <template #panel>
              <div class=" text-black p-2">
               <span class="font-extrabold text-xs">Categories</span>
               <ul class=" ">
                <li class="hover:bg-gray-100 hover:shadow-sm rounded-md px-2" v-for=" category in recipe.categories">
{{ category.name }}

                </li>
               </ul>
              </div>
            </template>
          </UPopover>
     </div>
      </div>
      <hr class="my-3">
      <div class="flex flex-wrap gap-2 justify-between ">
        <div class="flex gap-1">
          <UTooltip text="Prep/Cook Time" :popper="{ arrow: true }">
            <Icon name="material-symbols:nest-clock-farsight-analog-rounded" class="text-3xl" />
            <p class="mb-2 text-rose-400 font-bold">{{ recipe.prepTime }} </p>
          </UTooltip>
        </div>
        <div class="flex gap-1">
          <UTooltip text="Amount of Ingredients" :popper="{ arrow: true }">
            <Icon name="material-symbols:book-5" class="text-3xl" />
            <p class="mb-2 text-rose-400 font-bold">{{  JSON.parse(recipe.ingredients).length }} </p>
          </UTooltip>
        </div>
        <div class="flex gap-1">
          <UTooltip text="Serving Size" :popper="{ arrow: true }">
            <Icon name="ic:baseline-people" class="text-3xl" />
            <p class="mb-2 text-rose-400 font-bold">{{ recipe.servingSize }} </p>
          </UTooltip>
        </div>
      </div>
      <div v-if="route.path === '/recipes'" class="my-2">
        <p class=" text-sm">{{ recipe.description }}</p>
      </div>
    </div>

    
  </NuxtLink>
</template>

<script lang="ts" setup>
const route = useRoute()
defineProps(['recipe']);



</script>

<style></style>