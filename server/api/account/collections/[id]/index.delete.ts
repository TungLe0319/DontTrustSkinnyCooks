
export default defineAuthHandler(async (event) => {
  try {
    // Retrieve 'id' from the router parameters
    const id = getRouterParam(event, 'id');

    // Ensure user is authenticated
    const session = await requireAuthSession(event);

    // Check if 'id' is missing
    if (!id) {
      return createError('Missing id');
    }

    // Fetch the collection using the 'id'
    const foundCollection = await prisma().collection.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Check if the collection exists
    if (!foundCollection) {
      return createError('Collection not found');
    }

    // Check if the authenticated user is the owner of the collection
    if (foundCollection.userId !== session.user?.id) {
      return createError('Not Authorized');
    }

    // Delete the collection
    await prisma().collection.delete({
      where: {
        id: Number(id),
      },
    });

    // Optionally, you can return a success message or status here
    return { message: 'Collection deleted successfully' };
  } catch (error) {
    // Handle errors appropriately, log or rethrow if needed
    return error;
  }
});
