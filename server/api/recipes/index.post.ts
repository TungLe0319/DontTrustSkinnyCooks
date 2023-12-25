import type { Category } from '@prisma/client'
import { defineAuthHandler } from '../../utils/AuthSession'

// wrapper for auth required, does not progress if user is not logged in
export default defineAuthHandler(async (event) => {
  // const session = await requireAuthSession(event)
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
      cookTime,
      categories,
    } = await readBody(event)

    // Convert arrays to JSON strings
    const ingredientsJSON = JSON.stringify(ingredients)
    const directionsJSON = JSON.stringify(directions)
    const notesJSON = JSON.stringify(notes)

    // Log the JSON strings
    // console.log("Ingredients JSON:", ingredientsJSON);
    // console.log("Directions JSON:", directionsJSON);
    // console.log("Notes JSON:", notesJSON);

    const mappedCategories = categories.map((category: Category) => ({
      name: category,
    }))

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
        cookTime,
        user: {
          connect: {
            id: 'clqd5ehiv00005p76a661u9kv',
          },
        },
        categories: {
          connect: mappedCategories,
        },
      },
    })

    if (newRecipe)
      console.log('New recipe created:')

    return newRecipe
  }
  catch (error) {
    console.error('Error creating recipe:', error)
  }
})
