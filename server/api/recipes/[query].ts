
export default defineEventHandler(async (event) => {
const { query } = getQuery(event);

  try {
    const recipes = await prisma().recipe.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          // Add other fields you want to search here
        ],
      },
    });

    return recipes
  } catch (error) {
    console.error(error);
  
  }
})
