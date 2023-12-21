export default defineEventHandler(async (event) => {
  try {
    const {
      title,
      ingredients,
      directions,
      description,
      image,
      notes,
      servingSize,
      prepTime,
      categories,
    } = await readBody(event)

    // const session = await getServerSession(event, authOptions);
    // Convert arrays to JSON strings
    const ingredientsJSON = JSON.stringify(ingredients)
    const directionsJSON = JSON.stringify(directions)
    const notesJSON = JSON.stringify(notes)

    // Log the JSON strings
    // console.log("Ingredients JSON:", ingredientsJSON);
    // console.log("Directions JSON:", directionsJSON);
    // console.log("Notes JSON:", notesJSON);

    console.log('Categories:', categories)

    const mappedCategories = categories.map((category: string) => {
      return { name: category }
    })

    const newRecipe = await prisma().recipe.create({
      data: {
        title,
        ingredients: ingredientsJSON,
        directions: directionsJSON,
        description,
        image,
        notes: notesJSON,
        servingSize,
        prepTime,
        user: {
          connect: {
            id: 'clqd7shsj00002ux5xih4t7i0',
          },
        },
        categories: {
          connect: mappedCategories,
        },
      },
    })

    return newRecipe
  }
  catch (error) {
    console.error('Error creating recipe:', error)
  }
})
