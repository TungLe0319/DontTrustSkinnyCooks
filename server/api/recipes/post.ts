import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
   const { title, ingredients, directions,description,image,notes,servingSize,yieldAmount,prepTime } = await readBody(event);

   

    
    // Create a new recipe in the database
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        ingredients: JSON.stringify(ingredients),
        directions:JSON.stringify(directions),
        description,
        image,
        notes:JSON.stringify(notes),
        servingSize,
        yield:yieldAmount,
        prepTime,
        user:{
          connect:{
            id:1
          }
        }

      },
    });

    return newRecipe
  } catch (error) {
    console.error("Error creating recipe:", error);

  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
});
// /api/recipes/post.ts
