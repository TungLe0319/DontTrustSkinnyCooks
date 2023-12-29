export default defineEventHandler(async (event) => {
  try {
    // Retrieve 'id' from the router parameters
    const id = getRouterParam(event, 'id');

    // Ensure user is authenticated
    const session = await requireAuthSession(event);

    // Check if 'id' is missing
    if (!id) {
      return createError('Missing id');
    }

    // Fetch the recipe using the 'id'
    const foundRecipe = await prisma().recipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Check if the recipe exists
    if (!foundRecipe) {
      return createError('Recipe not found');
    }

    // Check if the authenticated user is the owner of the recipe
    if (foundRecipe.userId !== session.user?.id) {
      return createError('Not Authorized');
    }

    // Delete the recipe
    await prisma().recipe.delete({
      where: {
        id: Number(id),
      },
    });

    // Optionally, you can return a success message or status here
  } catch (error) {
    // Handle errors appropriately, log or rethrow if needed
    return error
  }
});
