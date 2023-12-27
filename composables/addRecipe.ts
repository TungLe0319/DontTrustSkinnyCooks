export function useAddRecipe() {
  return ref()
}

export function addNewIngredient(newRecipe: any) {
  newRecipe.ingredients.push('')
}

export function deleteIngredient(index: number, newRecipe: any) {
  const toast = useToast()
  newRecipe.ingredients.splice(index, 1)
  toast.add({
    id: `removed_ingredient ${index}`,
    title: 'Removed Ingredient',

    icon: 'i-heroicons-check-circle',
    timeout: 2000,
  })
}

export function updateIngredient(index: number, event: InputEvent, newRecipe: any) {
  // Assuming you are working with an input element, extract the value
  const value = (event.target as HTMLInputElement).value

  // Update the ingredient in the newRecipe object
  newRecipe.ingredients[index] = value
}

export function addNewDirection(newRecipe: any) {
  newRecipe.directions = [...newRecipe.directions, '']
}

export function deleteDirection(index: number, newRecipe: any) {
  const toast = useToast()
  newRecipe.directions.splice(index, 1)
  toast.add({
    id: `removed_direction ${index}`,
    title: 'Removed Direction',

    icon: 'i-heroicons-check-circle',
    timeout: 2000,
  })
}

export function updateDirection(index: number, event: InputEvent, newRecipe: any) {
  // Assuming you are working with an input element, extract the value
  const value = (event.target as HTMLInputElement).value

  // Update the ingredient in the newRecipe object
  newRecipe.directions[index] = value
}

export function addNewNote(newRecipe: any) {
  newRecipe.notes.push('')
}
export function deleteNote(index: number, newRecipe: any) {
  const toast = useToast()
  newRecipe.value.notes.splice(index, 1)
  toast.add({
    id: `removed_note ${index}`,
    title: 'Removed Note',

    icon: 'i-heroicons-check-circle',
    timeout: 2000,
  })
}

export function updateNote(index: number, event: InputEvent, newRecipe: any) {
  // Assuming you are working with an input element, extract the value
  const value = (event.target as HTMLInputElement).value

  // Update the ingredient in the newRecipe object
  newRecipe.notes[index] = value
}

interface ValidationResults {
  isValid: boolean
  missingFields: string[]
}

export function validateForm(recipe: Record<string,any>): ValidationResults {
  const excludedFields = ['image', 'notes', 'yieldAmount', 'cookTime']
  const validationResults: ValidationResults = {
    isValid: true,
    missingFields: [],
  }

  for (const [key, value] of Object.entries(recipe)) {
    // Skip validation for excluded fields
    if (excludedFields.includes(key))
      continue

    // Validate non-excluded fields
    if (Array.isArray(value)) {
      // Check if the array contains at least one non-empty string
      if (
        !value.some(item => typeof item === 'string' && item.trim() !== '')
      ) {
        validationResults.isValid = false
        validationResults.missingFields.push(key)
      }
    }
    else {
      // Validate non-array fields
      if (value === undefined || value === null || value === '') {
        validationResults.isValid = false
        validationResults.missingFields.push(key)
      }
    }
  }

  return validationResults
}

// TEST RECIPE WITH FIELDS FILLED OUT
// const newRecipe = ref({
//   title: 'Steak & Fries',
//   description: '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto et ducimus suscipit voluptatum saepe aut, aliquid dolorum quo consequatur sed! Odio dignissimos magnam mollitia.',
//   ingredients: ['16oz Steak (Room Temp)', '1 bag of fries', ' 1oz of Basil (chopped Fine)', '1oz of Olive Oil'],
//   directions: ['Salt and pepper the steak and let it sit till room temperature.', 'Preheat a cast iron pan till it starts smoking.', 'Add the Olive Oil to the preheated pan and add the steak.', 'Cook the steak for 3 minutes on each side.', 'Let the steak rest for 5 minutes before serving.'],
//   servingSize: 1,
//   yieldAmount: '1 16oz Steak',
//   prepTime: '24 Minutes',
//   cookTime: '15 Minutes',
//   notes: ['Having the steak room temp makes cooking it evenly alot smoother.', 'Make sure to let the steak rest before serving.', 'Make sure to preheat the pan before adding the steak.'],
//   image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   isPublic: true,
//   categories: [] as string[]
// })
