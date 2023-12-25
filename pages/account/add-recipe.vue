<script lang="ts" setup>
import { ref } from 'vue'
import type { RecipeFormObject } from '~/types/types'

const { session } = useAuth()
const toast = useToast()
const imageDisplay = computed(() => newRecipe.value.image)
const { data: categories } = await useFetch('/api/categories')
// definePageMeta({
//   middleware: ['auth'],
// })

const initialRecipeState: RecipeFormObject = {
  title: '',
  description: '',
  ingredients: [''],
  directions: [''],
  servingSize: 0,
  yieldAmount: '',
  prepTime: '',
  cookTime: '',
  notes: [''],
  image: '',
  isPublic: true,
  categories: [] as string[],
}

// const newRecipe = ref<RecipeFormObject>({...intialRecipeState});

const newRecipe = ref({
  title: 'Ramen with Soft-Boiled Egg',
  description: 'A comforting bowl of ramen featuring savory broth, noodles, and a perfectly soft-boiled egg for a satisfying and delicious meal.',
  ingredients: [
    '2 packs of ramen noodles',
    '4 cups chicken or vegetable broth',
    '2 large eggs',
    '2 tablespoons soy sauce',
    '1 tablespoon sesame oil',
    '1 tablespoon mirin (optional)',
    '1 teaspoon grated ginger',
    '2 cloves garlic, minced',
    'Green onions, sliced (for garnish)',
    'Red pepper flakes (optional, for added heat)',
  ],
  directions: [
    'Bring a pot of water to a boil. Carefully add the eggs and boil for 6 minutes for a soft-boiled egg. Transfer the eggs to an ice water bath to cool and stop the cooking process. Once cooled, peel and set aside.',
    'In a separate pot, bring the chicken or vegetable broth to a simmer. Add soy sauce, sesame oil, mirin (if using), grated ginger, and minced garlic. Allow the broth to simmer for 10-15 minutes to infuse the flavors.',
    'Cook the ramen noodles according to the package instructions. Drain and set aside.',
    'Divide the cooked ramen noodles into serving bowls.',
    'Pour the hot broth over the noodles, ensuring each bowl has a good amount of flavorful broth.',
    'Slice the soft-boiled eggs in half and place them on top of the ramen.',
    'Garnish with sliced green onions and red pepper flakes if you like some heat.',
    'Serve immediately and enjoy your comforting bowl of ramen with a soft-boiled egg!',
  ],
  servingSize: 2,
  yieldAmount: '2 servings',
  prepTime: '15 minutes',
  cookTime: '20 minutes',
  notes: ['Feel free to customize your ramen with additional toppings such as seaweed, bean sprouts, or sliced mushrooms. Adjust the soy sauce quantity based on your taste preference.'],
  image: 'ramen_with_soft_boiled_egg.jpg',
  isPublic: true,
  categories: ['Ramen', 'Japanese', 'Vegetarian', 'Vegan', 'Dairy-Free', 'Gluten-Free', 'Keto-Friendly', 'Low-Carb'],
})

// To reset the form, you can use a function like this:
function resetForm() {
  newRecipe.value = { ...initialRecipeState }
  Object.assign(newRecipe.value, initialRecipeState)
  toast.add({
    id: `reset_form ${newRecipe.value.title}`,
    title: 'Reset Form',
    description: 'Reset Recipe Form?',
    color: 'orange',
    timeout: 5000,
    actions: [
      {
        label: 'Confirm',
        click: async () => {
          toast.add({
            id: 'reset_form',
            title: 'Form Reset',
            description: 'Your form has been reset.',
            color: 'green',
            timeout: 3000,

          })
        },
      },
    ],
  })
}

const calculateProgress = computed(() => {
  const excludedFields = ['isPublic', 'yieldAmount', 'cookTime', 'notes', 'image']

  const filledFields = Object.entries(newRecipe.value).filter(([key, value]) => {
    // Skip excluded fields and check if the value is a non-empty string or a non-empty array
    if (!excludedFields.includes(key)) {
      if (key === 'servingSize') {
        return value !== undefined && value !== null && value !== 0
      }
      else if (Array.isArray(value)) {
        // Check if the array contains at least one non-empty string
        return value.some(item => typeof item === 'string' && item.trim() !== '')
      }
      else {
        return value !== undefined && value !== null && value !== ''
      }
    }
    return false
  }).length

  const totalFields = Object.keys(newRecipe.value).length - excludedFields.length

  // Return 0 if all relevant fields are empty or undefined
  if (filledFields === 0)
    return 0

  return (filledFields / totalFields) * 100
})

function validateCategories(newVal: string[], oldVal: string[]) {
  // Define your contradictory combinations
  const contradictoryCombinations = [
    ['Vegetarian', 'Poultry'],
    ['Vegetarian', 'Beef'],
    ['Vegetarian', 'Pork'],
    ['Vegetarian', 'Lamb'],
    ['Vegetarian', 'Fish'],
    ['Vegetarian', 'Shellfish'],
    ['Vegetarian', 'Eggs'],
    ['Vegetarian', 'Dairy'],
    ['Vegetarian', 'Cheese'],
    ['Vegan', 'Eggs'],
    ['Vegan', 'Dairy'],
    ['Vegan', 'Cheese'],
    ['Vegan', 'Poultry'],
    ['Vegan', 'Beef'],
    ['Vegan', 'Pork'],
    ['Vegan', 'Lamb'],
    ['Dairy-Free', 'Cheese'],
    ['Gluten-Free', 'Pasta'],
    ['Keto-Friendly', 'High-Carb'],
    ['Dairy-Free', 'Cheese'],
    ['Gluten-Free', 'Pasta'],
    ['Keto-Friendly', 'High-Carb'],
    ['Low-Carb', 'Rice Dishes'],
    // Add more combinations as needed
  ]

  for (const combination of contradictoryCombinations) {
    const intersection = combination.filter(category => newVal.includes(category))
    if (intersection.length > 1) {
      // Contradictory combination found, handle accordingly
      toast.add({
        id: `contradictory_combination ${intersection}`,
        title: 'Contradictory combination detected',
        description: `You have selected ${intersection?.join(', ')} which are contradictory combinations. Please select one or the other.`,
        icon: 'i-heroicons-information-circle',
        timeout: 5000,
        color: 'red',
      })
      console.error('Contradictory combination detected:', intersection)
      // For example, you could reset the selection or show an error message
      newRecipe.value.categories = oldVal
    }
  }
}

watch(() => newRecipe.value.categories, validateCategories)

async function createNewRecipe() {
  try {
    // Example usage
    const validationResults = validateForm(newRecipe.value)

    if (!validationResults.isValid) {
      return toast.add({
        id: `invalid_recipe_submission ${newRecipe.value.title}`,
        title: 'Invalid Form for new Recipe',
        description: `You have missing required inputs 
         ${validationResults.missingFields.map((field: string) => `<br> <strong>${field}</strong>`).join('')}
        `,
        icon: 'i-heroicons-information-circle',
        timeout: 5000,
        color: 'red',
      })
    }

    const response = await useFetch('/api/recipes', {
      method: 'POST',
      body: newRecipe.value,
    })

    toast.add({
      id: `Created_Recipe ${newRecipe.value.title}`,
      title: `Created_Recipe ${newRecipe.value.title}`,

      icon: 'i-heroicons-check-circle',
      timeout: 2000,

    })
    // console.log(response.data
    //   .value)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main class="min-h-screen pb-24">
    <div class="h-[50vh] w-full relative ">
      <img
        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="multiple ingredients laid out" class="absolute w-full h-full object-cover rounded shadow-md"
      >
    </div>
    <div class="flex justify-center">
      <div class=" shadow-2xl w-10/12 -translate-y-5 z-10 bg-white dark:bg-gray-800 p-5 rounded">
        <div class="space-y-5">
          <div class="flex gap-2">
            <Icon name="uil:plus-circle" class="text-3xl text-rose-400" />
            <h1 class="text-6xl font-extrabold ">
              Add Recipe
            </h1>
          </div>
          <p class="text-gray-500">
            Uploading personal recipes is easy! Add yours to your favorites, share with friends,
            family, or the
            DTSC community.
          </p>
        </div>
        <hr class="my-5">
        <div class="flex p-2 gap-10">
          <div class=" w-2/3 space-y-3">
            <UFormGroup label="Recipe Title" required>
              <UInput v-model="newRecipe.title" placeholder="Angle Hair Shrimp Pasta" size="xl" />
            </UFormGroup>
            <UFormGroup label="Description" required>
              <UTextarea
                v-model="newRecipe.description" color="primary" variant="outline"
                placeholder="grandma's best pasta recipe..." :rows="10"
              />
            </UFormGroup>
          </div>
          <div class="w-1/3 space-y-3 ">
            <p class="text-sm text-gray-700 font-medium  mb-2">
              Photo(Optional)
            </p>
            <UFormGroup label="Recipe Image">
              <UInput v-model="newRecipe.image" placeholder="url link..." size="xl" />
            </UFormGroup>
            <img
              :src="imageDisplay || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
              alt="" class="object-cover h-72 w-full shadow-xl rounded  "
            >
            <div class="border-4  border-orange-400 border-dashed  ">
              <!-- <label for="photoInput" class="relative cursor-pointer  overflow-hidden group w-full ">
                <input type="file" accept=".png, .jpeg" name="photo" id="fileInput" class="hidden"
                  @change="handleFileChange">
                <img
                  src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2810&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="salad dish" class="object-cover h-72 w-full shadow-xl  ">
                <div
                  class="absolute w-full  scale-0 group-hover:scale-100 transition-all duration-300 h-full font-extrabold text-white text-5xl bg-black/20 backdrop-blur-sm top-0 flex items-center justify-center   ">
                  Select File</div>
              </label> -->
            </div>
          </div>
        </div>
        <hr class="my-5">
        <div>
          <div class="space-y-3 flex flex-col">
            <p class="font-extrabold text-3xl  mb-2 text-orange-400">
              Ingredients
            </p>
            <p class="text-gray-500">
              Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
              special preparation
              (i.e. sifted, softened, chopped).
            </p>
            <div class="flex items-center gap-2 text-gray-500">
              <Icon name="fluent:important-12-filled" class="" />
              <p class="text-sm">
                Add or Remove ingredients!
              </p>
            </div>
          </div>
          <div v-auto-animate class="space-y-3 my-5">
            <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index" class="flex gap-5 w-full items-center">
              <div class="w-11/12">
                <UFormGroup :label="`Ingredient ${index + 1}`" :required="index <= 0">
                  <UInput
                    color="white" variant="outline" size="xl"
                    :placeholder="index === 0 ? '1 Cup of Flour, Sifted...' : (index === 1 ? '1 Pkg Bacon, 12 strips...' : (index === 2 ? '2 Tablespoons salt' : 'New Ingredient...'))"
                    :value="ingredient" @input="updateIngredient(index, $event, newRecipe)"
                  />
                </UFormGroup>
              </div>
              <div class="w-1/12 flex items-center mt-6">
                <UTooltip text="Delete Ingredient" :popper="{ arrow: true }">
                  <Icon
                    name="material-symbols:delete"
                    class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400"
                    @click="deleteIngredient(index, newRecipe)"
                  />
                </UTooltip>
              </div>
            </div>
          </div>
          <div class="">
            <UButton
              icon="i-heroicons-plus-circle" size="xl" variant="solid" label="Add Ingredient" :trailing="false"
              class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]"
              @click="addNewIngredient(newRecipe)"
            />
          </div>
        </div>
        <hr class="my-5">
        <div>
          <div class="space-y-3 flex flex-col">
            <p class="font-extrabold text-3xl  mb-2 text-orange-400">
              Directions
            </p>
            <p class="text-gray-500">
              Explain how to make your recipe, including oven temperatures, baking or cooking
              times,
              and pan sizes, etc.
            </p>
            <div class="flex items-center gap-2 text-gray-500">
              <Icon name="fluent:important-12-filled" class="" />
              <p class="text-sm">
                Add or Remove steps in the directions to be more specific!
              </p>
            </div>
          </div>
          <div v-auto-animate class="space-y-3 my-5">
            <div v-for="(direction, index) in newRecipe.directions" :key="index" class="flex items-center gap-5  w-full">
              <div class="w-11/12">
                <UFormGroup :label="`Step ${index + 1}`" :required="index <= 0">
                  <UTextarea
                    color="white" variant="outline" size="xl"
                    :placeholder="index === 0 ? 'Preheat Oven to 350 degrees F...' : (index === 1 ? 'Combine all dry ingredients in a mixing bowl...' : (index === 2 ? 'Pour into greased trays and bake for 15-20 minutes...' : 'New Direction...'))"
                    :value="direction" @input="updateDirection(index, $event, newRecipe)"
                  />
                </UFormGroup>
              </div>
              <div class="w-1/12 flex items-center mt-6">
                <UTooltip text="Delete Step" :popper="{ arrow: true }">
                  <Icon
                    name="material-symbols:delete"
                    class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400"
                    @click="deleteDirection(index, newRecipe)"
                  />
                </UTooltip>
              </div>
            </div>
            <div class="">
              <UButton
                icon="i-heroicons-plus-circle" size="xl"
                class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" variant="solid"
                label="Add Direction" :trailing="false" @click="addNewDirection(newRecipe)"
              />
            </div>
          </div>
        </div>
        <hr class="my-5">
        <div class="flex  justify-between gap-5">
          <div class="w-1/2">
            <UFormGroup label="Serving Size" required>
              <UInput v-model="newRecipe.servingSize" type="number" placeholder="e.g. 4..." size="xl" />
            </UFormGroup>
          </div>
          <div class="w-1/2">
            <UFormGroup label="Yield (Optional)">
              <UInput v-model="newRecipe.yieldAmount" placeholder="e.g. 1 9-inch cake..." size="xl" />
            </UFormGroup>
          </div>
        </div>
        <hr class="my-5">
        <div class="  space-y-3">
          <p class="font-extrabold text-3xl  mb-2 text-orange-400">
            Prep/Cook Time
          </p>
          <p class="text-gray-500">
            Enter the total time it takes to prepare and cook your recipe.
          </p>
          <div class="flex items-center gap-2 text-gray-500">
            <Icon name="fluent:important-12-filled" class="" />
            <p class="text-sm">
              Be sure to include whether its Minutes, Hours, Days. (1.e. 15 minutes)
            </p>
          </div>
          <div class=" flex items-center justify-between gap-10">
            <div class="w-1/2">
              <UFormGroup label="Prep Time" required>
                <UInput v-model="newRecipe.prepTime" placeholder="15 Minutes..." size="xl" />
              </UFormGroup>
            </div>
            <div class="w-1/2">
              <UFormGroup label="Cook Time (Optional)">
                <UInput v-model="newRecipe.cookTime" placeholder="25 Minutes..." size="xl" />
              </UFormGroup>
            </div>
          </div>
        </div>
        <hr class="my-5">
        <div class="space-y-3">
          <p class="font-extrabold text-3xl  mb-2 text-orange-400">
            Notes(Optional)
          </p>
          <p class="text-gray-500">
            Add any helpful tips about ingredient substitutions, serving, or storage here.
          </p>
          <div v-auto-animate class="space-y-3 my-3">
            <div v-for="(note, index) in newRecipe.notes" :key="index" class="flex items-center w-full gap-5">
              <div class="w-11/12">
                <UFormGroup :label="`Note ${index + 1}`">
                  <UInput
                    color="white" variant="outline" size="xl"
                    :placeholder="index === 0 ? 'e.g. dont whisk too hard...' : 'New Note...'" :value="note"
                    @input="updateNote(index, $event, newRecipe)"
                  />
                </UFormGroup>
              </div>
              <div class="w-1/12 flex items-center mt-6">
                <UTooltip text="Delete Note" :popper="{ arrow: true }">
                  <Icon
                    name="material-symbols:delete"
                    class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400"
                    @click="deleteNote(index, newRecipe)"
                  />
                </UTooltip>
              </div>
            </div>
          </div>
          <div class="">
            <UButton
              icon="i-heroicons-plus-circle" size="xl"
              class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" variant="solid"
              label="Add Note" :trailing="false" @click="addNewNote(newRecipe)"
            />
          </div>
        </div>
        <hr class="my-5">
        <div class=" space-y-3">
          <div class=" my-4 space-y-3">
            <p class="text-4xl font-extrabold text-orange-400">
              Categories
            </p>
            <p class="text-gray-500">
              Select at least 1 but up to as many categories that fit your recipe as you like.
            </p>
            <div class="flex items-center gap-2 text-gray-500">
              <Icon name="fluent:important-12-filled" class="" />
              <p class="text-sm">
                Be careful about making confusing combinations with categories (i.e. Low Carb + Pasta),
                (i.e. Vegetarian + High Protein )
              </p>
            </div>
            <div v-auto-animate class="mb-4 flex flex-wrap gap-2">
              <span v-for="(category, index) in newRecipe.categories">
                <UBadge
                  size="lg"
                  class="shadow-md bg-indigo-400/90 hover:scale-[1.01] hover:shadow-xl hover:bg-indigo-500 transition-all duration-300 hover:cursor-pointer"
                  @click="newRecipe.categories = newRecipe.categories.filter((_, i) => i !== index)"
                >
                  {{ category }}
                </UBadge>
              </span>
            </div>
          </div>
          <USelectMenu
            v-model="newRecipe.categories" :options="categories" multiple placeholder="Select Categories"
            searchable searchable-placeholder="Search a Category..." size="xl" value-attribute="name"
            option-attribute="name"
            :ui-menu="{ base: 'space-y-2', option: { container: 'w-full', selected: 'bg-green-400/50' } }"
          >
            <template #option="{ option: Categories }">
              <span> {{ Categories.name }} </span>
            </template>
            <template #option-empty="{ query }">
              <q>{{ query }}</q> not found
            </template>
          </USelectMenu>
        </div>
        <hr class="my-5">
        <div class=" flex flex-col ">
          <UFormGroup label="Make Recipe Public?">
            <UToggle v-model="newRecipe.isPublic" class="bg-orange-400" size="xl" />
          </UFormGroup>
          <p>
            {{ newRecipe.isPublic }}
          </p>
          <div class="flex justify-end gap-2">
            <UButton
              size="xl" class="text-orange-400 hover:text-orange-300 transition-all duration-150" variant="link" label="Cancel"
              @click="resetForm"
            />
            <UButton
              :disabled="!session?.user" icon="i-heroicons-plus-circle" size="xl"
              class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" variant="solid"
              label="Submit Recipe" :trailing="false" @click="createNewRecipe"
            />
          </div>
        </div>
        <hr class="my-5">
        <p class="text-xs italic text-gray-500">
          <strong>Don't Trust A Skinny Cook </strong>is all about cooks like you. If
          you found this recipe in a magazine, cookbook, or on a website, we can't publish it. Published recipes are
          subject to our <strong>Terms of Service.</strong>
        </p>
      </div>
      <!-- <div class="w-1/2 p-5 sticky top-5 h-full">
        {{ newRecipe }}
      </div> -->
    </div>
    <div class="fixed top-0 left-0 w-full  z-50 ">
      <UMeter :value="calculateProgress" color="purple" />
    </div>
  </main>
</template>

<style></style>
