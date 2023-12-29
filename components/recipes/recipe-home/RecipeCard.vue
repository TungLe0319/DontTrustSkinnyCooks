<script lang="ts" setup>
import ProfileCard from '~/components/globals/ProfileCard.vue'
import type { Collection, RecipeWithUserAndCategories } from '~/types/types'

const { recipe } = defineProps<{
  recipe: RecipeWithUserAndCategories

}>()
const { data: Collections } = useFetch<Collection[]>('/api/account/collections')
const collections = ref(Collections.value)
const { user } = useAuth()
const route = useRoute()
const toast = useToast()
const isOpen = ref(false)
const selectedCategories = useSelectedCategory()

async function saveRecipe(collectionId: number) {
  try {
    await useFetch(`/api/account/collections/${collectionId}`, {
      method: 'PUT',
      body: {
        recipeId: recipe.id,
      },
    })

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

const checkCollectionRelation = (
  collectionId: number,
  recipeId: number,
  userId: string
) => {
  const { data: Collections } = useFetch<Collection[]>('/api/account/collections');
  const collections = ref(Collections.value);

  // Check if recipeId is present in any collection
  const isRecipeInCollection = (collection: Collection) => {
    return collection.recipes.some((id:number) => id === recipeId);
  };

  // Filter collections to include only those that do not have the recipeId
  const filteredCollections = collections?.value?.filter(
    (collection) => !isRecipeInCollection(collection)
  );

  // Update the collections reference with the filtered result
  collections.value = filteredCollections;
};


const handleImageError = (imageUrl:string) => {
  return imageUrl = 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
}
</script>

<template>
  <UCard
    class=" rounded shadow-md hover:bg-zinc-800 hover:text-white  transition-all duration-200 group hover:shadow-xl hover:shadow-black/30 group dark:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:shadow-white/20"
    :ui="{ body: { padding: {} } }"
  >
 
    <NuxtLink
      :to="`/recipes/${recipe.id}`" class="flex items-center mb-2 relative  w-full overflow-hidden  "
      :class="route.name === 'profile-id' ? 'h-52' : 'h-44'"
    >

     
      <img
        v-if="recipe.image" :src="recipe?.image " :alt="recipe?.title"
        @error="handleImageError(recipe.image)"
        class="absolute w-full object-cover  shadow-black  transition-all duration-150  group-hover:grayscale rounded-t object-center "
        :class="route.name === 'profile-id' ? 'h-42' : 'h-full'"
      >
         <USkeleton v-else class="h-72 w-full bg-gray-300" /> 

      <div
        class="absolute flex items-center justify-center font-extrabold text-4xl w-full  p-10 z-10  translate-y-[10rem] group-hover:translate-y-4 transition-all duration-300 text-primary bg-gradient-to-t from-black  h-full"
      >
        View Recipe
      </div>
    </NuxtLink>
    <div class="p-5 pt-2">
      <div class="flex flex-col gap-5">
        <h3 class="text-xl  font-extrabold group-hover:underline group-hover:underline-offset-2">
          {{ recipe.title }}
        </h3>
        <div class="flex gap-3">
          <UPopover mode="hover" :ui="{ width: 'max-w-72' }">
            <UAvatar size="3xs" :src="recipe.user.image || ''" alt="Avatar" />
            <template #panel>
              <ProfileCard :user="recipe.user" />
            </template>
          </UPopover>
          <UPopover mode="hover" :ui="{ width: 'max-w-72' }">
            <Icon name="carbon:collapse-categories" class="hover:text-primary" />
            <template #panel>
              <div class=" text-black p-2">
                <span class="font-extrabold text-xs">Categories</span>
                <ul class=" ">
                  <li v-for=" category in recipe.categories" :key="category.name" class="hover:bg-gray-100 hover:shadow-sm rounded-md px-2">
                    {{ category.name }}
                  </li>
                </ul>
              </div>
            </template>
          </UPopover>
          <UTooltip v-if="user" text="Save Recipe" :popper="{ arrow: true }">
            <Icon
              name="material-symbols:bookmark-add" class="text-xl  hover:text-primary-500 hover:cursor-pointer "
              @click="isOpen = true"
            />
          </UTooltip>
          <div class="ml-auto flex items-center gap-1 text-primary-500 hover:text-primary/70 transition-all duration-300">
            <Icon v-for="i in 5" :key="i" name="game-icons:fat" />
          </div>
        </div>
      </div>
      <hr class="my-3">
      <div v-if="selectedCategories?.length >= 1" v-auto-animate class="my-5 flex gap-2 flex-wrap p-2">
        <span v-for="category in recipe.categories" :key="category.name">
          <UBadge
            size="xs"
            class="shadow-md hover:scale-[1.01] hover:shadow-xl transition-all duration-300 hover:cursor-pointer bg-gray-500/40"
            :class="selectedCategories?.includes(category.name) ? 'bg-green-500 text-white' : ''"
          >
            {{ category.name }}
          </UBadge>
        </span>
      </div>
    </div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h1 class="text-2xl font-bold">
            Add to Collection
          </h1>
          <p class="text-gray-500">
            Save a recipe to your selected collection
          </p>
        </template>
        <div class="p-4">
          <ul class="">
            <li
              v-for="collection in collections" :key="collection.id"
              class=" border-b border-b-gray-200 p-1.5 hover:cursor-pointer hover:bg-gray-100 transition-all duration-200 flex gap-3"
            >
              <span>
                {{ collection.title }}
              </span>
              <UButton class="ml-auto" @click="saveRecipe(collection.id)">
                Save
              </UButton>
            </li>
          </ul>
        </div>
      </UCard>
    </UModal>
  </UCard>
</template>

<style scoped></style>
