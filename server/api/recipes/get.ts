import { PrismaClient } from "@prisma/client";



export default defineEventHandler(async (event) => {
  try {
    const recipes = await prisma().recipe.findMany({
     include:{
      user:true,
      categories:true
     }
    });

    return recipes;
  } catch (error) {
    console.error("Error creating recipe:", error);
  } 
});
// /api/recipes/post.ts
