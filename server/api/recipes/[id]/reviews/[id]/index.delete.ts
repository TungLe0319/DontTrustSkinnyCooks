export default defineEventHandler(async (event) => {
  try {
    // Retrieve 'id' from the router parameters
    const id = getRouterParam(event, 'id')

    // Ensure user is authenticated
    const session = await requireAuthSession(event)

    // Check if 'id' is missing
    if (!id)
      return createError('Missing id')

    // Fetch the recipe using the 'id'
    const foundReview = await prisma().review.findUnique({
      where: {
        id: Number(id),
      },
    })

    // Check if the recipe exists
    if (!foundReview)
      return createError('Review not found')

    // Check if the authenticated user is the owner of the recipe
    if (foundReview.userId !== session.user?.id)
      return createError('Not Authorized')

    // Delete the recipe
    await prisma().review.delete({
      where: {
        id: Number(id),
      },
    })

    // Optionally, you can return a success message or status here
  }
  catch (error) {
    // Handle errors appropriately, log or rethrow if needed
    return error
  }
})
