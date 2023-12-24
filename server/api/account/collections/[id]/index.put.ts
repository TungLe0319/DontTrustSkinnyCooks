import { authOptions } from "../../../auth/[...]"

import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {



  try {
    
const {recipeId} = await  readBody(event)
console.log(recipeId)
  const collectionId = getRouterParam(event, 'id')

    if (!collectionId)
      return createError('Missing id')



   const session = await getServerSession(event, authOptions)

   if (!session?.user) {
    
      throw createError({
        statusCode:401,
        statusMessage:'Unauthorized',
        
      })

   }



  await prisma().collection.update({
      where:{
        id:Number(collectionId)
      },
      data:{
        recipes:{
          connect:{
            id:Number(recipeId)
          }
        }
      }
    })
  
  
  } catch (error) {
    throw createError({
      statusCode:500,
      statusMessage:'Internal Server Error',
      
    })
  }
})
