import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      return createError("Missing id");
    }

    console.log(id);
    
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });

console.log(recipe);


    return recipe;
  } catch (error) {
    console.error("Error getting recipe:", error);
  } finally {
    await prisma.$disconnect()
  }
});

