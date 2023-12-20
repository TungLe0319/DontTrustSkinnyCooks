<template>
  <main class="min-h-screen">
    <div class="h-[50vh] w-full relative ">
      <img
        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="multiple ingredients laid out" class="absolute w-full h-full object-cover">
    </div>

   
    <div class="flex justify-center">
      <div class=" shadow-2xl w-10/12 -translate-y-5 z-10 bg-white dark:bg-gray-800 p-10">
        <div class="space-y-5">
          <div class="flex gap-2">
            <Icon name="uil:plus-circle" class="text-3xl text-rose-400" />
            <h1 class="text-4xl font-extrabold ">Add Recipe</h1>
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
          <div class="w-1/3 ">
            <p class="text-sm text-gray-700 font-medium  mb-2">
              Photo(Optional)
            </p>
            <UFormGroup label="Recipe Title" required>
              <UInput placeholder="Pasta" size="xl" v-model="newRecipe.image" />
            </UFormGroup>
            <img :src="imageDisplay" alt="" class="object-cover h-72 w-full shadow-xl  ">
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
          <p class="font-extrabold text-3xl  mb-2">Ingredients </p>
          <p class="text-gray-500">Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
            special preparation
            (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e.
            Cake, Frosting, Dressing).</p>
          <div class="space-y-3 my-3">
            <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index" class="flex gap-5 w-full">
     <div class="w-11/12">
       <UInput  color="white" variant="outline"
                  size="xl" :placeholder="'e.g. ' + (index + 1) + ' cups'" :value="ingredient"
                  @input="updateIngredient(index, $event)" />


     </div>
                 <div class="w-1/12 flex items-center">
      <UTooltip text="Delete Ingredient"  :popper="{ arrow: true }">
     <Icon name="uil:minus-circle" class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400" @click="deleteIngredient(index)"/>
      </UTooltip>
   
     </div>
            </div>
        
          </div>
          <div class="">
            <UButton icon="i-heroicons-plus-circle" size="xl" color="primary" variant="solid" label="Add Ingredient"
              :trailing="false" @click="addNewIngredient" />
          </div>
        </div>
        <hr class="my-5">
        <div>
           <p class="font-extrabold text-3xl  mb-2">
            Directions </p>
          <p class="text-gray-500">Explain how to make your recipe, including oven temperatures, baking or cooking times,
            and pan sizes, etc.
            Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).</p>
          <div class="space-y-3 my-5">
            <div v-for="(direction, index) in newRecipe.directions"
                :key="index" class="flex items-center gap-5  w-full">
   <div class="w-11/12">
     <UFormGroup  
                  :label="'Step ' + (index + 1)" required
                  >
                  <UTextarea color="white" variant="outline" size="xl"
                    :placeholder="index === 0 ? 'Preheat Oven to 350 degrees F...' : (index === 1 ? 'Combine all dry ingredients in a mixing bowl...' : (index === 2 ? 'Pour into greased trays and bake for 15-20 minutes...' : 'New Direction...'))"
                    :value="direction" @input="updateDirection(index, $event)" />
                </UFormGroup>
   </div>
   <div class="w-1/12 flex items-center">
    <UTooltip text="Delete Step"  :popper="{ arrow: true }">
   <Icon name="uil:minus-circle" class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400" @click="deleteDirection(index)"/>
    </UTooltip>
   
   </div>
            </div>
          
            <div class="">
              <UButton icon="i-heroicons-plus-circle" size="xl" color="primary" variant="solid" label="Add Direction"
                :trailing="false" @click="addNewDirection" />
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
        <div class=" flex items-center justify-between">
          <div class="flex gap-2 items-end">
            <UFormGroup label="Prep Time" required>
              <UInput type="number" placeholder="0" size="xl" v-model="newRecipe.prepTime" />
            </UFormGroup>
            <USelectMenu v-model="selectedPrepTime" :options="times" size="xl" />
          </div>
          <div class="flex gap-2 items-end">
            <UFormGroup label="Cook Time (Optional)">
              <UInput type="number" placeholder="0" size="xl" v-model="newRecipe.cookTime" />
            </UFormGroup>
            <USelectMenu v-model="selectedCookTime" :options="times" size="xl" />
          </div>
        </div>
        <hr class="my-5">
        <div class="space-y-3">
        <p class="font-extrabold text-3xl  mb-2">Notes(Optional)</p>
          <p class="text-gray-500">Add any helpful tips about ingredient substitutions, serving, or storage here.</p>
          <div class="space-y-3 my-3">

            <div v-for="(note, index) in newRecipe.notes" :key="index" class="flex items-center w-full">
              <div class="w-11/12">
  <UInput  color="white" variant="outline" size="xl"
                :placeholder="index === 0 ? 'e.g. dont whisk too hard...' : 'New Note...'" :value="note"
                @input="updateNote(index, $event)" />
              </div>
               <div class="w-1/12 flex items-center">
      <UTooltip text="Delete Note"  :popper="{ arrow: true }">
     <Icon name="uil:minus-circle" class="text-3xl hover:shadow-xl transition-all duration-300 rounded-full hover:cursor-pointer hover:text-red-400" @click="deleteNote(index)"/>
      </UTooltip>
   
     </div>
            </div>
            
          </div>
          <div class="">
            <UButton icon="i-heroicons-plus-circle" size="xl" color="primary" variant="solid" label="Add Note"
              :trailing="false" @click="addNewNote" />
          </div>
        </div>
        <hr class="my-5">
        <div class=" flex flex-col ">
          <UFormGroup label="Make Recipe Public?">
            <UToggle color="primary" size="xl" v-model="newRecipe.isPublic" />
          </UFormGroup>
          <p>
            {{ newRecipe.isPublic }}
          </p>
          <div class="flex justify-end gap-2">
            <UButton size="xl" color="primary" variant="link" label="Cancel" />
            <UButton icon="i-heroicons-plus-circle" size="xl" color="primary" variant="solid" label="Submit Recipe"
              :trailing="false" @click="createNewRecipe" />
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
const times = ['minutes', 'hours', 'days']
const selectedPrepTime = ref(times[0])
const selectedCookTime = ref(times[0])
const publicRecipe = ref(false)
const toast = useToast()
const imageDisplay = computed(() => newRecipe.value.image)

definePageMeta({
    middleware: ['auth']
})

const deleteIngredient = (index:number) => {
  newRecipe.value.ingredients.splice(index, 1)
  toast.add({
    id: `removed_ingredient ${index}`,
    title: 'Removed Ingredient',
  
    icon: 'i-heroicons-check-circle',
    timeout: 2000,
   
  })
}

const deleteDirection = (index:number) => {
  newRecipe.value.directions.splice(index, 1)
    toast.add({
    id: `removed_direction ${index}`,
    title: 'Removed Direction',
   
    icon: 'i-heroicons-check-circle',
    timeout: 2000,

  })
}
const deleteNote = (index:number) => {
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
      method:'POST',
      body: newRecipe.value
    })

        toast.add({
      id: `Created_Recipe`,
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

const newRecipe = ref({
  title: 'Steak & Fries',
  description: '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto et ducimus suscipit voluptatum saepe aut, aliquid dolorum quo consequatur sed! Odio dignissimos magnam mollitia.',
  ingredients: ['16oz Steak (Room Temp)', '1 bag of fries', ' 1oz of Basil (chopped Fine)', '1oz of Olive Oil'],
  directions: ['Salt and pepper the steak and let it sit till room temperature.', 'Preheat a cast iron pan till it starts smoking.', 'Add the Olive Oil to the preheated pan and add the steak.', 'Cook the steak for 3 minutes on each side.', 'Let the steak rest for 5 minutes before serving.'],
  servingSize: 1,
  yieldAmount: '1 16Oz Steak',
  prepTime: 24,
  cookTime: 10,
  notes: ['Having the steak room temp makes cooking it evenly alot smoother.', 'Make sure to let the steak rest before serving.', 'Make sure to preheat the pan before adding the steak.'],
  image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  isPublic:true

})

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

const updateIngredient = (index:any, value:any) => {
  newRecipe.ingredients[index] = value;
};

const addNewDirection = () => {
  newRecipe.value.directions.push('')
}

const updateDirection = (index, value) => {
  newRecipe.directions[index] = value;
}

const addNewNote = () => {
  newRecipe.value.notes.push('')
}

const updateNote = (index, value) => {
  newRecipe.notes[index] = value;
}
</script>

<style></style>