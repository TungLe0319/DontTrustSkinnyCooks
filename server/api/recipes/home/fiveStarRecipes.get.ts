export default defineEventHandler(async (event) => {
  const io = event.context.io

  try {
    const recipes = await prisma().recipe.findMany({
      include: {
        categories: true,
        user: true,
        reviews:true
      },
    })

    return recipes
  }
  catch (error) {
    console.error('Error creating recipe:', error)
  }
})
// /api/recipes/post.ts
