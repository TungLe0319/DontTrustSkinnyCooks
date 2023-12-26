import { authOptions } from '../../auth/[...]'

import { getServerSession } from '#auth'

export default defineAuthHandler(async (event) => {
  try {
    const { title } = await readBody(event)

    const session = await getServerSession(event, authOptions)

    const newCollection = prisma().collection.create({
      data: {
        title,

        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },

    })

    return newCollection
  }
  catch (error) {

  }
})
