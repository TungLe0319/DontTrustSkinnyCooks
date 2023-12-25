export default defineEventHandler(async (event) => {
  try {
    const recipeCounts = await prisma().recipe.groupBy({
      by: ['userId'],
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: 'desc',
        },
      },
    })

    const userIds = recipeCounts.map(item => item.userId)

    const users = await prisma().user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    })

    // Combine user information with recipe counts
    const result = recipeCounts.map((recipeCount) => {
      const user = users.find(user => user.id === recipeCount.userId)
      return {
        ...recipeCount,
        user,
      }
    })

    return result
  }
  catch (error) {
    return { error: 'Internal Server Error fetching Contributors' }
  }
})
// /api/recipes/post.ts
