export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma().category.findMany()
    return categories
  }
  catch (error) {
    console.log(error)
  }
})
