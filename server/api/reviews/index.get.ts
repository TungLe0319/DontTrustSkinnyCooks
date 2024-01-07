// users should be able to see all reviews for a recipe, even if not logged in
export default defineEventHandler(async (event) => {


  const reviews = await prisma().review.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          // email: true,
        },
      },
      recipe:{
        select:{
          title:true,
          id:true,
          image:true
        }
      }
    },
  })

  return reviews
})
