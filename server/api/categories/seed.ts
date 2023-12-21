export default defineEventHandler(async (event) => {
  // Food categories array
  const foodCategories = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Dinner',
    'Appetizers',
    'Snacks',
    'Beverages',
    'Smoothies',
    'Salads',
    'Soups',
    'Main Dishes',
    'Side Dishes',
    'Pasta',
    'Rice Dishes',
    'Grilled',
    'Roasted',
    'Baked',
    'Stir-fry',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto-Friendly',
    'Low-Carb',
    'High-Protein',
    'Seafood',
    'Poultry',
    'Beef',
    'Pork',
    'Lamb',
  ]

  // Function to seed categories into the database
  async function seedCategories() {
    for (const category of foodCategories) {
      await prisma().category.create({
        data: {
          name: category,
        },
      })
    }
  }

  // Execute the seeding function
  seedCategories()
})
