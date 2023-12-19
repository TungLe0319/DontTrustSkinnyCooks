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
      
        return response as Recipe[];
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },

    async fetchRecipe(id:string){
      try {
        const response = await recipesService.getRecipe(id);
      
        return response 
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
  },
});
