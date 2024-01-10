export default defineEventHandler(async (event) => {
  try {
    const recipes = await prisma().recipe.findMany({
      include: {
        categories: true,
        user: true,
        reviews: {

        },
      },
    })

    return recipes
  }
  catch (error) {
    console.error('Error creating recipe:', error)
  }
})
// /api/recipes/post.ts
