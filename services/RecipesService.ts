// RecipeService.ts

import type { Recipe } from "@prisma/client";



const BASE_URL = "/api/recipes";

class RecipesService {
 getAllRecipes  = async () => useFetch(BASE_URL);



   createRecipe =  async (newRecipe:Recipe) => useFetch(BASE_URL, {
    body:newRecipe
  });

 
}

export const recipesService =  new RecipesService();