export default defineEventHandler(async (event) => {
  try {
    const recipes = await prisma().recipe.findMany({
      include: {
        categories: true,
        user: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    const recipesWithAverageRating = recipes.map((recipe) => {
      const reviews = recipe.reviews || []
      const totalRatings = reviews.length
      const sumRatings = reviews.reduce((acc, review) => acc + (review.rating || 0), 0)
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0

      return {
        ...recipe,
        averageRating,
      }
    })

    return recipesWithAverageRating
  }
  catch (error) {
    console.error('Error fetching recipes and average ratings:', error)
    throw error // Ensure the error is propagated if needed
  }
})
