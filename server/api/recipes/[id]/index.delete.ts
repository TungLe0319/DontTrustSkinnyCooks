export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

  await  prisma().recipe.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {}
});
