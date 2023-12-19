import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: 1,
      },
      include:{
        user:true
      }
    });

    return recipe;
  } catch (error) {
    console.error("Error getting recipe:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
});
// /api/recipes/post.ts
