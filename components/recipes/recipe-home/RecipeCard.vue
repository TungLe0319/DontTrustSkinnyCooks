<script lang="ts" setup>
import ProfileCard from '~/components/globals/ProfileCard.vue'

 const {recipe} =defineProps(['recipe'])
const route = useRoute()
const toast = useToast()
const selectedCategories = useSelectedCategory()
async function saveRecipe() {
  try {
    toast.add({
      title: 'Recipe Saved',
      timeout: 3000,
      description: 'You can view your saved recipes in your profile.',
      icon: 'i-heroicons-bookmark-20-solid',
    })
  }
  catch (error) {

  }
}
</script>

<template>
  <div
    class=" rounded shadow-xl hover:bg-zinc-800 hover:text-white  transition-all duration-300 group hover:shadow-2xl hover:shadow-black group dark:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:shadow-white/20"
  >
    <NuxtLink
      :to="`/recipes/${recipe.id}`" class="flex items-center mb-2 relative  w-full overflow-hidden  shadow-xl"
      :class="route.name === 'profile-id' ? 'h-52' : 'h-44'"
    >
      <img
      v-if="recipe.image"
        :src="recipe.image || ''" alt="Recipe Picture"
        class="absolute w-full object-cover  shadow-black  transition-all duration-150  group-hover:grayscale rounded-t object-center"
        :class="route.name === 'profile-id' ? 'h-42' : 'h-full'"
      >
      <div class="flex flex-col items-center justify-center space-y-5 w-full">
        <Icon name="mdi:camera-off-outline" class="text-7xl " />
        <span class="italic font-bold">
          no image available
        </span>
      </div>
      <div
        class="absolute flex items-center justify-center font-extrabold text-3xl w-full  p-10 z-10  translate-y-[15rem] group-hover:translate-y-0 transition-all duration-300 text-orange-400 bg-gradient-to-t from-black  h-full"
      >
        View Recipe

        <img src="https://media.tenor.com/xElnqsceEx4AAAAi/cutting-randy-marsh.gif" alt="" class="w-1/2">
      </div>
    </NuxtLink>
    <div class="p-5 pt-2">
      <div class="flex flex-col gap-5">
        <h2 class="text-xl  font-extrabold">
          {{ recipe.title }}
        </h2>
        <div class="flex gap-3">
          <UPopover mode="hover" :ui="{ width: 'max-w-72' }">
            <UAvatar size="3xs" :src="recipe.user.image" alt="Avatar" />
            <template #panel>
              <ProfileCard :user="recipe.user" />
            </template>
          </UPopover>
          <UPopover mode="hover" :ui="{ width: 'max-w-72' }">
            <Icon name="carbon:collapse-categories" class="hover:text-orange-400" />
            <template #panel>
              <div class=" text-black p-2">
                <span class="font-extrabold text-xs">Categories</span>
                <ul class=" ">
                  <li v-for=" category in recipe.categories" class="hover:bg-gray-100 hover:shadow-sm rounded-md px-2">
                    {{ category.name }}
                  </li>
                </ul>
              </div>
            </template>
          </UPopover>
          <UTooltip text="Save Recipe" :popper="{ arrow: true }">
            <Icon
              name="material-symbols:bookmark-add" class="text-xl  hover:text-orange-400 hover:cursor-pointer "
              @click="saveRecipe"
            />
          </UTooltip>
          <div class="ml-auto flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-all duration-300">
            <Icon v-for="i in 5" name="game-icons:fat" />
          </div>
        </div>
      </div>
      <hr class="my-3">

      <div v-if="selectedCategories.length >= 1" v-auto-animate class="my-5 flex gap-2 flex-wrap p-2">
        <span v-for="(category, index) in recipe.categories">
          <UBadge

            size="xs"
            class="shadow-md hover:scale-[1.01] hover:shadow-xl transition-all duration-300 hover:cursor-pointer bg-gray-500/40"
            :class="selectedCategories.includes(category.name) ? 'bg-green-500 text-white' : ''"
          >
            {{ category.name }}
          </UBadge>
        </span>
      </div>

      <!--
   <div class="my-5 flex gap-4" v-auto-animate>
          <span v-for="(category, index) in selectedCategories">
            <UBadge  size="xs"
              class="shadow-md hover:scale-[1.01] hover:shadow-xl hover:bg-emerald-500 transition-all duration-300 hover:cursor-pointer">
              {{ category }}
            </UBadge>
          </span>
        </div> -->

      <!-- <div class="flex flex-wrap gap-2 justify-between ">
        <UTooltip text="Prep/Cook Time" :popper="{ arrow: true }">
          <div class="flex items-center gap-2">
            <Icon name="material-symbols:nest-clock-farsight-analog-rounded" class="text-xl" />
            <p class="mb-2 text-orange-400 font-bold">{{ recipe.prepTime }} </p>
          </div>
        </UTooltip>
        <UTooltip text="Amount of Ingredients" :popper="{ arrow: true }">
          <div class="flex items-center gap-2">
            <Icon name="material-symbols:book-5" class="text-xl" />
            <p class="mb-2 text-orange-400 font-bold">{{ JSON.parse(recipe.ingredients).length }} </p>
          </div>
        </UTooltip>
        <UTooltip text="Serving Size" :popper="{ arrow: true }">
          <div class="flex items-center gap-2">
            <Icon name="ic:baseline-people" class="text-xl" />
            <p class="mb-2 text-orange-400 font-bold">{{ recipe.servingSize }} </p>
          </div>
        </UTooltip>
      </div> -->
      <!-- <div v-if="route.path === '/recipes'" class="my-2">
        <p class=" text-sm">{{ recipe.description }}</p>
      </div> -->
    </div>
  </div>
</template>

<style></style>
