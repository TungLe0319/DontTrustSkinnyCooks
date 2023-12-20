// RecipeService.ts

import type { Recipe } from "@prisma/client";

const BASE_URL = "/api/recipes";

class RecipesService {
  async getAllRecipes() {
    try {
      const response = await useFetch("/api/recipes/get");
//  console.log(response.data.value);
 
      return response.data.value;
    } catch (error) {
      console.error(error);
    }
  }

  async getRecipe(id: string) {
    try {
      const response = await useFetch(`/api/recipes/${id}`);

      return response.data.value;
    } catch (error) {
      console.error(error);
    }
  } 
}

export const recipesService = new RecipesService();
