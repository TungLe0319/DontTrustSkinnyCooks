import { defineStore } from 'pinia'
import type { Prisma } from '@prisma/client'
import { recipesService } from '~/services/RecipesService'

export type RecipeWithUser = Prisma.RecipeGetPayload<{
  include: { user: true }
}>
export const useMyRecipesStore = defineStore({
  id: 'myRecipesStore',
  state: () => ({
    recipes: [] as RecipeWithUser[],
  }),
  actions: {
    setRecipes(newRecipes: any) {
      this.recipes = newRecipes
    },
    async fetchRecipes() {
      try {
        const response = await recipesService.getAllRecipes()

        return response
      }
      catch (error) {
        console.error('Error fetching recipes:', error)
      }
    },

    async fetchRecipe(id: string) {
      try {
        const response = await recipesService.getRecipe(id)

        return response as RecipeWithUser
      }
      catch (error) {
        console.error('Error fetching recipe:', error)
      }
    },
  },
})
