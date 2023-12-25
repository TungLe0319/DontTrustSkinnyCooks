import { authOptions } from '../../../auth/[...]'

import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log(body)
    const collectionId = getRouterParam(event, 'id')

    if (!collectionId)
      return createError('Missing id')

    const session = await getServerSession(event, authOptions)

    if (!session?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',

      })
    }

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
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',

    })
  }
})
