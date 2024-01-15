import { authOptions } from '../../auth/[...]'

import { getServerSession } from '#auth'

export default defineAuthHandler(async (event) => {
  try {
    const { title } = await readBody(event)

    const session = await getServerSession(event, authOptions)



  // Ensure the request method is POST
    if (event.method !== 'POST') {
      return {
        statusCode: 405,  // Method Not Allowed
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }







  // Ensure the request body contains the required data
    if (!title) {
      return {
        statusCode: 400,  // Bad Request
        body: JSON.stringify({ error: 'Missing title in the request body' }),
      };
    }




















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
