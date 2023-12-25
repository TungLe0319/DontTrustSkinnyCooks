import type { Prisma } from '@prisma/client'

export interface RecipeFormObject {
  title: string
  description: string
  ingredients: string[]
  directions: string[]
  servingSize: number
  yieldAmount: string
  prepTime: string
  cookTime: string
  notes: string[]
  image: string
  isPublic: boolean
  categories: string[]
}

export type RecipeWithUser = Prisma.RecipeGetPayload<{
  include: { user: true }
}>

export type RecipeWithUserAndCategories = Prisma.RecipeGetPayload<{
  include: { user: true, categories: true }
}>

export type Collection = Prisma.CollectionGetPayload<{
  include: {
    _count: {
      select: {
        recipes: true
      }
    }
  }
}>

export type CollectionWithUser = Prisma.CollectionGetPayload<{
  include: { user: true }
}>
export type CollectionWithUserAndRecipes = Prisma.CollectionGetPayload<{
  include: { user: true; recipes: {
    include: {
      user: true
      categories: true
    }
  } }
}>
