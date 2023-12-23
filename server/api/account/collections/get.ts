import { authOptions } from "../../auth/[...]"

import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {



  try {
    
   const session = await getServerSession(event, authOptions)

   if (!session?.user) {
    
      throw createError({
        statusCode:401,
        statusMessage:'Unauthorized',
        
      })

   }



    const collections = await prisma().collection.findMany({
      where: {
        userId: session.user.id
      },
  
      },
    )
  
    return collections
  } catch (error) {
    throw createError({
      statusCode:500,
      statusMessage:'Internal Server Error',
      
    })
  }
})
