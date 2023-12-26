import { authOptions } from '../../auth/[...]'

import { getServerSession } from '#auth'

export default defineAuthHandler(async (event) => {
  try {
    const session = await getServerSession(event, authOptions)

    if (!session?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',

      })
    }

    const collections = await prisma().collection.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        _count: {
          select: {
            recipes: true,
          },
        },
      },
    },
    )

    return collections
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',

    })
  }
})
