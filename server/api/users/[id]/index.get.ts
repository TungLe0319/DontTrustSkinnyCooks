export default defineEventHandler(async (event) => {
  try {
    // Retrieve 'id' from the router parameters
    const id = getRouterParam(event, 'id')

    // Check if 'id' is missing
    if (!id)
      return createError('Missing id')

    // Fetch the recipe using the 'id'
    const foundUser = await prisma().user.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          where: {
            rating: {
              not: 0,
            },
          },
          include: {
            recipe: {
              include: {
                user: true,
                categories: true,
                _count: {
                  select: {
                    reviews: true,
                  },
                },
                reviews: {
                  select: {
                    id: true,
                    rating: true,

                  },
                },
              },
            },
          },
          orderBy: {
            id: 'desc',
          },
          distinct: ['recipeId'],
        },

      },
    })

    // Check if the recipe exists
    if (!foundUser)
      return createError('Recipe not found')

    return foundUser
  }
  catch (error) {
    // Handle errors appropriately, log or rethrow if needed
    return error
  }
})
