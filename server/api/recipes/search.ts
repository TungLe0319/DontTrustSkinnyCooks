export default defineEventHandler(async (event) => {
 
  const {q} = await  readBody(event)







    const recipe = await prisma().recipe.findMany({
    where: {
      // Define your search criteria based on the 'q' parameter and your database model
      // For example, you might want to search in the title or description field
      OR: [
        { title: { contains: q,  } },
        { description: { contains: q,  } },
      ],
    },
    include:{
      categories:true,
      user:true,
    }
    
  });

  // Process and return the search result
  return recipe;
})
