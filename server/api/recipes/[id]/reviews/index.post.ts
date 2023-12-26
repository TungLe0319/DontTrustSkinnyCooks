export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('received', body)

  const id = getRouterParam(event, 'id')
  const recipeId = Number.parseInt(id!)

  const session = await requireAuthSession(event)

  const userId = session.user?.id
  if (!userId)
    throw createError('Not Authorized')

  // return body
  const newReview = await prisma().review.create({
    data: {
      recipeId,
      userId,
      rating: body.rating,
      comment: body.comment,
    },
  })
  return newReview
})
