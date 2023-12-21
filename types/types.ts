// interface Recipe {
//   title: string;
//   description: string;
//   ingredients: string[];
//   directions: string[];
//   servingSize: number;
//   yieldAmount: string;
//   prepTime: string;
//   cookTime: string;
//   notes: string[];
//   image: string;
//   isPublic: boolean;
//   categories: string[];
// }

import type { Prisma } from "@prisma/client";

// export { Recipe };



export type RecipeWithUser = Prisma.RecipeGetPayload<{
  include: { user: true };
}>;

export type RecipeWithUserAndCategories = Prisma.RecipeGetPayload<{
  include: { user: true; categories: true };
}>;
