<template>
  <main class="min-h-screen pb-24">
    <div class="h-[50vh] w-full relative ">
      <img
        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="multiple ingredients laid out" class="absolute w-full h-full object-cover rounded shadow-md">
    </div>
    <div class="flex justify-center">
      <div class=" shadow-2xl w-10/12 -translate-y-5 z-10 bg-white dark:bg-gray-800 p-5 rounded">
        <div class="space-y-5">
          <div class="flex gap-2">
            <Icon name="uil:plus-circle" class="text-3xl text-rose-400" />
            <h1 class="text-6xl font-extrabold ">Add Recipe</h1>
          </div>
          <p class="text-gray-500">Uploading personal recipes is easy! Add yours to your favorites, share with friends,
            family, or the
            DTSC community.</p>
        </div>
        <hr class="my-5">
        <div class="flex p-2 gap-10">
          <div class=" w-2/3 space-y-3">
            <UFormGroup label="Recipe Title" required>
              <UInput placeholder="Pasta" size="xl" v-model="newRecipe.title" />
            </UFormGroup>
            <UFormGroup label="Description" required>
              <UTextarea color="primary" variant="outline" placeholder="" :rows="10" v-model="newRecipe.description" />
            </UFormGroup>
          </div>
          <div class="w-1/3 space-y-3 ">
            <p class="text-sm text-gray-700 font-medium  mb-2">
              Photo(Optional)
            </p>
            <UFormGroup label="Recipe Title" required>
              <UInput placeholder="Pasta" size="xl" v-model="newRecipe.image" />
            </UFormGroup>
            <img :src="imageDisplay" alt="" class="object-cover h-72 w-full shadow-xl rounded  ">
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
              Ingredients </p>
            <p class="text-gray-500">Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
              special preparation
              (i.e. sifted, softened, chopped).
            </p>
            <div class="flex items-center gap-2 text-gray-500">
              <Icon name="fluent:important-12-filled" class="" />
              <p class="text-sm"> Add or Remove ingredients!</p>
            </div>
          </div>
          <div class="space-y-3 my-5" v-auto-animate>
            <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index" class="flex gap-5 w-full items-center">
              <div class="w-11/12">
                <UFormGroup :label="'Ingredient ' + (index + 1)" :required="index <= 0">
                  <UInput color="white" variant="outline" size="xl" :placeholder="'e.g. ' + (index + 1) + ' cups'"
                    :value="ingredient" @input="updateIngredient(index, $event)" />
                </UFormGroup>
              </div>
              <div class="w-1/12 flex items-center mt-6">
                <UTooltip text="Delete Ingredient" :popper="{ arrow: true }">
                  <Icon name="material-symbols:delete"
                    class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400"
                    @click="deleteIngredient(index)" />
                </UTooltip>
              </div>
            </div>
          </div>
          <div class="">
            <UButton icon="i-heroicons-plus-circle" size="xl" variant="solid" label="Add Ingredient" :trailing="false"
              @click="addNewIngredient"
              class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" />
          </div>
        </div>
        <hr class="my-5">
        <div>
          <div class="space-y-3 flex flex-col">
            <p class="font-extrabold text-3xl  mb-2 text-orange-400">
              Directions </p>
            <p class="text-gray-500">Explain how to make your recipe, including oven temperatures, baking or cooking
              times,
              and pan sizes, etc.
            </p>
            <div class="flex items-center gap-2 text-gray-500">
              <Icon name="fluent:important-12-filled" class="" />
              <p class="text-sm"> Add or Remove steps in the directions to be more specific!</p>
            </div>
          </div>
          <div class="space-y-3 my-5" v-auto-animate>
            <div v-for="(direction, index) in newRecipe.directions" :key="index" class="flex items-center gap-5  w-full">
              <div class="w-11/12">
                <UFormGroup :label="'Step ' + (index + 1)" :required="index <= 0">
                  <UTextarea color="white" variant="outline" size="xl"
                    :placeholder="index === 0 ? 'Preheat Oven to 350 degrees F...' : (index === 1 ? 'Combine all dry ingredients in a mixing bowl...' : (index === 2 ? 'Pour into greased trays and bake for 15-20 minutes...' : 'New Direction...'))"
                    :value="direction" @input="updateDirection(index, $event)" />
                </UFormGroup>
              </div>
              <div class="w-1/12 flex items-center mt-6">
                <UTooltip text="Delete Step" :popper="{ arrow: true }">
                  <Icon name="material-symbols:delete"
                    class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400"
                    @click="deleteDirection(index)" />
                </UTooltip>
              </div>
            </div>
            <div class="">
              <UButton icon="i-heroicons-plus-circle" size="xl"
                class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" variant="solid"
                label="Add Direction" :trailing="false" @click="addNewDirection" />
            </div>
          </div>
        </div>
        <hr class="my-5">
        <div class="flex  justify-between gap-5">
          <div class="w-1/2">
            <UFormGroup label="Serving Size" required>
              <UInput type="number" placeholder="e.g. 4" size="xl" v-model="newRecipe.servingSize" />
            </UFormGroup>
          </div>
          <div class="w-1/2">
            <UFormGroup label="Yield (Optional)">
              <UInput placeholder="e.g. 1 9-inch cake" size="xl" v-model="newRecipe.yieldAmount" />
            </UFormGroup>
          </div>
        </div>
        <hr class="my-5">
        <div class="  space-y-3">
          <p class="font-extrabold text-3xl  mb-2 text-orange-400">Prep/Cook Time</p>
          <p class="text-gray-500">Enter the total time it takes to prepare and cook your recipe.</p>
          <div class="flex items-center gap-2 text-gray-500">
            <Icon name="fluent:important-12-filled" class="" />
            <p class="text-sm">Be sure to include whether its Minutes, Hours, Days. (1.e. 15 minutes)</p>
          </div>
          <div class=" flex items-center justify-between gap-10">
            <div class="w-1/2">
              <UFormGroup label="Prep Time" required>
                <UInput placeholder="0" size="xl" v-model="newRecipe.prepTime" />
              </UFormGroup>
            </div>
            <div class="w-1/2">
              <UFormGroup label="Cook Time (Optional)">
                <UInput placeholder="0" size="xl" v-model="newRecipe.cookTime" />
              </UFormGroup>
            </div>
          </div>
        </div>
        <hr class="my-5">
        <div class="space-y-3">
          <p class="font-extrabold text-3xl  mb-2 text-orange-400">Notes(Optional)</p>
          <p class="text-gray-500">Add any helpful tips about ingredient substitutions, serving, or storage here.</p>
          <div class="space-y-3 my-3" v-auto-animate>
            <div v-for="(note, index) in newRecipe.notes" :key="index" class="flex items-center w-full gap-5">
              <div class="w-11/12">
                <UFormGroup :label="'Note ' + (index + 1)">
                  <UInput color="white" variant="outline" size="xl"
                    :placeholder="index === 0 ? 'e.g. dont whisk too hard...' : 'New Note...'" :value="note"
                    @input="updateNote(index, $event)" />
                </UFormGroup>
              </div>
              <div class="w-1/12 flex items-center mt-6">
                <UTooltip text="Delete Note" :popper="{ arrow: true }">
                  <Icon name="material-symbols:delete"
                    class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400"
                    @click="deleteNote(index)" />
                </UTooltip>
              </div>
            </div>
          </div>
          <div class="">
            <UButton icon="i-heroicons-plus-circle" size="xl"
              class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" variant="solid"
              label="Add Note" :trailing="false" @click="addNewNote" />
          </div>
        </div>
        <hr class="my-5">
        <div class=" space-y-3">
          <div class=" my-4 space-y-3">
            <p class="text-4xl font-extrabold text-orange-400">
              Categories
            </p>
            <p class="text-gray-500">Select at least 1 but up to  as many categories that fit your recipe as you like.</p>
            <div class="flex items-center gap-2 text-gray-500">
              <Icon name="fluent:important-12-filled" class="" />
              <p class="text-sm">Be careful about making confusing combinations with categories (i.e. Low Carb + Pasta),
                (i.e. Vegetarian + High Protein )</p>
            </div>
            <div class="mb-4 flex flex-wrap gap-2" v-auto-animate>
              <span v-for="(category, index) in newRecipe.categories">
                <UBadge @click="newRecipe.categories = newRecipe.categories.filter((_, i) => i !== index)" size="lg"
                  class="shadow-md bg-indigo-400/90 hover:scale-[1.01] hover:shadow-xl hover:bg-indigo-500 transition-all duration-300 hover:cursor-pointer">
                  {{ category }}
                </UBadge>
              </span>
            </div>
          </div>
          <USelectMenu v-model="newRecipe.categories" :options="categories" multiple placeholder="Select Categories"
            searchable searchable-placeholder="Search a Category..." size="xl" value-attribute="name"
            option-attribute="name"
            :ui-menu="{ base: 'space-y-2', option: {  container: 'w-full', selected: 'bg-green-400/50' }, }">
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
            <UToggle class="bg-orange-400" size="xl" v-model="newRecipe.isPublic" />
          </UFormGroup>
          <p>
            {{ newRecipe.isPublic }}
          </p>
          <div class="flex justify-end gap-2">
            <UButton size="xl" class="text-orange-400 hover:text-orange-300 transition-all duration-150" variant="link"
              label="Cancel" />
            <UButton icon="i-heroicons-plus-circle" size="xl"
              class="bg-orange-400 hover:bg-orange-300 duration-150 transition-all hover:scale-[1.01]" variant="solid"
              label="Submit Recipe" :trailing="false" @click="createNewRecipe" />
          </div>
        </div>
        <hr class="my-5">
        <p class="text-xs italic text-gray-500"><strong>Don't Trust A Skinny Cook </strong>is all about cooks like you. If
          you found this recipe in a magazine, cookbook, or on a website, we can't publish it. Published recipes are
          subject to our <strong>Terms of Service.</strong></p>
      </div>
      <!-- <div class="w-1/2 p-5 sticky top-5 h-full">
        {{ newRecipe }}
      </div> -->
 
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


const toast = useToast()
const imageDisplay = computed(() => newRecipe.value.image)
const newRecipeCategories = computed(() => newRecipe.value.categories)
const { data: categories } = await useFetch('/api/categories/get')
definePageMeta({
  middleware: ['auth']
})


const newRecipe = ref({
  title: 'Steak & Fries',
  description: '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto et ducimus suscipit voluptatum saepe aut, aliquid dolorum quo consequatur sed! Odio dignissimos magnam mollitia.',
  ingredients: ['16oz Steak (Room Temp)', '1 bag of fries', ' 1oz of Basil (chopped Fine)', '1oz of Olive Oil'],
  directions: ['Salt and pepper the steak and let it sit till room temperature.', 'Preheat a cast iron pan till it starts smoking.', 'Add the Olive Oil to the preheated pan and add the steak.', 'Cook the steak for 3 minutes on each side.', 'Let the steak rest for 5 minutes before serving.'],
  servingSize: 1,
  yieldAmount: '1 16oz Steak',
  prepTime: '24 Minutes',
  cookTime: '15 Minutes',
  notes: ['Having the steak room temp makes cooking it evenly alot smoother.', 'Make sure to let the steak rest before serving.', 'Make sure to preheat the pan before adding the steak.'],
  image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  isPublic: true,
  categories: [] as string[]
})









const validateCategories = (newVal: string[], oldVal: string[]) => {
  // Define your contradictory combinations
  const contradictoryCombinations = [
    ["Vegetarian", "Poultry"],
    ["Vegetarian", "Beef"],
    ["Vegetarian", "Pork"],
    ["Vegetarian", "Lamb"],
    ["Vegetarian", "Fish"],
    ["Vegetarian", "Shellfish"],
    ["Vegetarian", "Eggs"],
    ["Vegetarian", "Dairy"],
    ["Vegetarian", "High-Protein"],
    ["Vegan", "Poultry"],
    ["Vegan", "Beef"],
    ["Vegan", "Pork"],
    ["Vegan", "Lamb"],
    ["Dairy-Free", "Cheese"],
    ["Gluten-Free", "Pasta"],
    ["Keto-Friendly", "High-Carb"],
    ["Low-Carb", "Rice Dishes"],
    ["Vegetarian", "High-Protein"],
    ["Vegan", "Poultry"],
    ["Vegan", "Beef"],
    ["Vegan", "Pork"],
    ["Vegan", "Lamb"],
    ["Dairy-Free", "Cheese"],
    ["Gluten-Free", "Pasta"],
    ["Keto-Friendly", "High-Carb"],
    ["Low-Carb", "Rice Dishes"]
    // Add more combinations as needed
  ];

  for (const combination of contradictoryCombinations) {
    const intersection = combination.filter(category => newVal.includes(category));
    if (intersection.length > 1) {
      // Contradictory combination found, handle accordingly
      toast.add({
        id: `contradictory_combination ${intersection}`,
        title: 'Contradictory combination detected',
        description: `You have selected ${intersection?.join(', ')} which are contradictory combinations. Please select one or the other.`,
        icon: 'i-heroicons-information-circle',
        timeout: 5000,
        color: "red"
      })
      console.error('Contradictory combination detected:', intersection);
      // For example, you could reset the selection or show an error message
      newRecipe.value.categories = oldVal;
    }
  }
};

// Watch for changes in selectedCategories
watch(newRecipe.value.categories, validateCategories);




const deleteIngredient = (index: number) => {
  newRecipe.value.ingredients.splice(index, 1)
  toast.add({
    id: `removed_ingredient ${index}`,
    title: 'Removed Ingredient',

    icon: 'i-heroicons-check-circle',
    timeout: 2000,

  })
}

const deleteDirection = (index: number) => {
  newRecipe.value.directions.splice(index, 1)
  toast.add({
    id: `removed_direction ${index}`,
    title: 'Removed Direction',

    icon: 'i-heroicons-check-circle',
    timeout: 2000,

  })
}
const deleteNote = (index: number) => {
  newRecipe.value.notes.splice(index, 1)
  toast.add({
    id: `removed_note ${index}`,
    title: 'Removed Note',

    icon: 'i-heroicons-check-circle',
    timeout: 2000,

  })
}

const createNewRecipe = async () => {
  try {
    const response = await useFetch('/api/recipes/post', {
      method: 'POST',
      body: newRecipe.value
    })

    toast.add({
      id: `Created_Recipe ${response.data?.value?.id}`,
      title: 'Successfully Created Recipe',

      icon: 'i-heroicons-check-circle',
      timeout: 2000,

    })
    // console.log(response.data
    //   .value)
  } catch (error) {
    console.error(error)
  }
}



const handleFileChange = (event: any) => {
  const file = event.target.files[0];

  if (file) {
    console.log(file)
    const validExtensions = ['.png', '.jpeg'];
    const extension = file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2);

    if (validExtensions.includes(`.${extension.toLowerCase()}`)) {
      // Handle the valid file
      // You can add additional logic or emit an event as needed
    } else {
      // Invalid file type, you may want to display a message or handle it accordingly
      console.error('Invalid file type. Please choose a .png or .jpeg file.');
    }
  }
};

const addNewIngredient = () => {
  newRecipe.value.ingredients.push('')
};





const updateIngredient = (index: number, value: any) => {
  //@ts-ignore
  newRecipe.ingredients[index] = value;
};

const addNewDirection = () => {
  newRecipe.value.directions.push('')
}

const updateDirection = (index: number, value: any) => {

  //@ts-ignore
  newRecipe.directions[index] = value;
}

const addNewNote = () => {
  newRecipe.value.notes.push('')
}

const updateNote = (index: number, value: any) => {
  //@ts-ignore
  newRecipe.notes[index] = value;
}
</script>

<style></style>