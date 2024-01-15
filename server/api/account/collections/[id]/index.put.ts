export default defineAuthHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log(body)
    const collectionId = getRouterParam(event, 'id')
    console.log(collectionId)

    if (!collectionId)
      return createError('Missing id')

    const existingCollection = await prisma().collection.findUnique({
      where: {
        id: Number(collectionId),
      },
      select: {
        recipes: {
          where: {
            id: Number(body.recipeId),
          },
        },
      },
    })

    if (existingCollection && existingCollection.recipes.length > 0) {
      // Recipe is already connected, unconnect it
      await prisma().collection.update({
        where: {
          id: Number(collectionId),
        },
        data: {
          recipes: {
            disconnect: {
              id: Number(body.recipeId),
            },
          },
        },
      })
    }
    else {
      // Recipe is not connected, connect it
      await prisma().collection.update({
        where: {
          id: Number(collectionId),
        },
        data: {
          recipes: {
            connect: {
              id: Number(body.recipeId),
            },
          },
        },
      })
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
