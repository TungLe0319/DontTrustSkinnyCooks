import type { Prisma } from "@prisma/client";

export interface RecipeFormObject {
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  servingSize: number;
  yieldAmount: string;
  prepTime: string;
  cookTime: string;
  notes: string[];
  image: string;
  isPublic: boolean;
  categories: string[];
}


export type RecipeWithUser = Prisma.RecipeGetPayload<{
  include: { user: true };
}>;

export type RecipeWithUserAndCategories = Prisma.RecipeGetPayload<{
  include: { user: true; categories: true };
}>;
