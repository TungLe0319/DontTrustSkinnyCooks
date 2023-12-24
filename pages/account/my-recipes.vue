<template>
    <UContainer class="">
            <div class="flex flex-col shadow-xl space-y-5 p-5">
              <div class="flex items-center gap-2 ">
                <Icon name="arcticons:recipe-keeper" class="text-5xl" />
                <span class=" text-5xl font-extrabold"> My Recipes I've Added</span>
              </div>
              <span>Recipes you have created on Don't Trust Skinny
                Cooks
              </span>
              <span class="text-xs flex items-center italic gap-2 text-gray-500">
                <Icon name="fluent:people-audience-20-filled" class="text-xl" />
                <span> Other users will see the recipes you've made public.</span>
              </span>
              <hr>
              <div class="grid  grid-cols-3 gap-2  ">
      
                <RecipeCard v-for="recipe in userRecipes" :key="recipe.id" :recipe="recipe" class="" />
              </div>
            </div>
            <!-- End of Experience and education grid -->
          </UContainer>
</template>

<script lang="ts" setup>
import RecipeCard from '~/components/recipes/recipe-home/RecipeCard.vue';
import type { RecipeWithUserAndCategories } from '~/types/types';
const {session} = useAuth()
const {data:recipes} = await useFetch<RecipeWithUserAndCategories[]>('/api/recipes/get')
const userRecipes = recipes.value?.filter(recipe => recipe.userId === session.value?.user?.id)
</script>

<style>

</style>