export default defineEventHandler(async (event) => {
  try {
    const recipes = await prisma().recipe.findMany({
     
     where:{
      
     }
      ,

      include: {
        categories: true,
        user: true,
      },
    })

    return recipes
  }
  catch (error) {
    console.error('Error creating recipe:', error)
  }
})
// /api/recipes/post.ts
