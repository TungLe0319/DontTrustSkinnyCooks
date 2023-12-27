export default defineEventHandler(async (event) => {
  try {
    const recipes = await prisma().recipe.findMany({
take:4,
     orderBy:{
      createdAt: 'desc'
     }
,
  
    })

    return recipes
  }
  catch (error) {
    console.error('Error creating recipe:', error)
  }
})
// /api/recipes/post.ts
