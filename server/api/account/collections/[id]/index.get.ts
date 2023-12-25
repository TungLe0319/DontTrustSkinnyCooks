import { authOptions } from '../../../auth/[...]'

import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id)
      return createError('Missing id')

    const session = await getServerSession(event, authOptions)

    if (!session?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',

      })
    }

    const collection = await prisma().collection.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        recipes: {
          include: {
            user: true,
            categories: true,
          },
        },
      },
    })

    return collection
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',

    })
  }
})
