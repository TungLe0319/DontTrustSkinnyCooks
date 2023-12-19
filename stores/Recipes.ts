import { defineStore } from 'pinia'
import {  recipesService } from '~/services/RecipesService';
import type { Recipe } from '@prisma/client';
export const useMyRecipesStore = defineStore({
  id: "myRecipesStore",
  state: () => ({
    recipes: [] as Recipe[],
  }),
  actions: {
    setRecipes(newRecipes:any) {
      this.recipes = newRecipes;
    },
    async fetchRecipes() {
      try {
        const response = await recipesService.getAllRecipes();
        this.setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
  },
});
