// users should be able to see all reviews for a recipe, even if not logged in
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // const db = prisma()
  if (!id)
    throw createError('Missing recipe ID')

  const recipeId = Number.parseInt(id)

  const reviewsWithUsers = await prisma().review.findMany({
    where: {
      recipeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          // email: true,
        },
      },
    },
  })

  return reviewsWithUsers
})
