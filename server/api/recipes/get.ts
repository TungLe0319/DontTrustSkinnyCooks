import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const recipes = await prisma.recipe.findMany({
     include:{
      user:true,
      categories:true
     }
    });

    return recipes;
  } catch (error) {
    console.error("Error creating recipe:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
});
// /api/recipes/post.ts
