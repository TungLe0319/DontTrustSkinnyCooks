export default defineEventHandler(async (event) => {

  try {

   
  } catch (error) {
    console.error('Error fetching top users:', error);
    return { error: 'Internal Server Error' };
  }
})
// /api/recipes/post.ts
