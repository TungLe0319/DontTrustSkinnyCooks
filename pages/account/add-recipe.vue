<template>
  <main class="min-h-screen">
    <div class="h-[50vh] w-full relative ">
      <img
        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="multiple ingredients laid out" class="absolute w-full h-full object-cover">
    </div>
    <div class="flex justify-center">
      <div class=" shadow-2xl w-2/3 -translate-y-5 z-10 bg-white p-10">
        <div class="space-y-5">
          <div class="flex gap-2">
            <Icon name="uil:plus-circle" class="text-3xl text-rose-400" />
            <h1 class="text-4xl font-extrabold ">Add Recipe</h1>
          </div>
          <p class="text-gray-500">Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the
            Allrecipes community.</p>
        </div>
        <hr class="my-5">
        <div class="flex p-2 gap-10">
          <div class=" w-2/3 space-y-3">
            <UFormGroup label="Recipe Title" required>
              <UInput placeholder="Pasta" size="xl" />
            </UFormGroup>
            <UFormGroup label="Description" required>
              <UTextarea color="primary" variant="outline" placeholder=""  rows="10" />
            </UFormGroup>
          </div>
          <div class="w-1/3 ">
            <p class="text-sm text-gray-700 font-medium  mb-2">
              Photo(Optional)
            </p>
           <div class="border-4  border-orange-400 border-dashed  ">
             <label for="photoInput" class="relative cursor-pointer  overflow-hidden group w-full ">
                <input type="file" name="photo" id="photoInput" class="hidden">
                <img
                  src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2810&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="salad dish" class="object-cover h-72 w-full shadow-xl  ">
                <div
                  class="absolute w-full  scale-0 group-hover:scale-100 transition-all duration-300 h-full font-extrabold text-white text-5xl bg-black/20 backdrop-blur-sm top-0 flex items-center justify-center   ">
                  Select File</div>
              </label>
           </div>
          </div>
        </div>
        <hr class="my-5">
        <div>
          <p class="font-medium text-sm  mb-2">Ingredients </p>
          <p class="text-gray-500">Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation
            (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e.
            Cake, Frosting, Dressing).</p>
          <div class="space-y-3 my-3">
            <UInput color="white" variant="outline" size="xl" placeholder="e.g. 2 cups flour, sifted" />
            <UInput color="white" variant="outline" size="xl" placeholder="e.g. 1 cup sugar" />
            <UInput color="white" variant="outline" size="xl" placeholder="e.g. 2 tablespoons butter, softened" />
          </div>
           <div class="">
                 <UButton
                    icon="i-heroicons-plus-circle"
                    size="xl"
                    color="primary"
                    variant="solid"
                    label="Add Ingredient"
                    :trailing="false"
                    />
              </div>
        </div>
        <hr class="my-5">
        <div>
          <p class="font-medium text-sm  mb-2">Directions </p>
          <p class="text-gray-500">Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.
            Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).</p>
          <div class="space-y-3 my-3">
            <UFormGroup label="Step 1" required>
              <UTextarea color="primary" variant="outline" placeholder="e.g. Preheat oven to 350 degrees F..." />
            </UFormGroup>
            <UFormGroup label="Step 2" required>
              <UTextarea color="primary" variant="outline"
                placeholder="e.g. Combine all dry ingredients in a large bowl..." />
            </UFormGroup>
            <UFormGroup label="Step 3" required>
              <UTextarea color="primary" variant="outline"
                placeholder="e.g. Pour into greased trays  and bake for 15-20 minutes..." />
            </UFormGroup>
            <div class="">
               <UButton
                  icon="i-heroicons-plus-circle"
                  size="xl"
                  color="primary"
                  variant="solid"
                  label="Add Direction"
                  :trailing="false"
                  />
            </div>
          </div>
        </div>
        <hr class="my-5">
        <div class="flex  justify-between gap-5">
          <div class="w-1/2">
            <UFormGroup label="Serving Size" required>
              <UInput placeholder="e.g. 4" size="xl" />
            </UFormGroup>
          </div>
          <div class="w-1/2">
            <UFormGroup label="Yield (Optional)">
              <UInput placeholder="e.g. 1 9-inch cake" size="xl" />
            </UFormGroup>
          </div>
        </div>
        <hr class="my-5">
        <div class=" flex items-center justify-between">
          <div class="flex gap-2 items-end">
            <UFormGroup label="Prep Time" required>
              <UInput type="number" placeholder="0" size="xl" />
            </UFormGroup>
            <USelectMenu v-model="selectedTime" :options="times" size="xl" />
          </div>
            <div class="flex gap-2 items-end">
              <UFormGroup label="Cook Time (Optional)" >
                <UInput type="number" placeholder="0" size="xl" />
              </UFormGroup>
              <USelectMenu v-model="selectedTime" :options="times" size="xl" />
            </div>
        </div>
            <hr class="my-5">
            <div class="space-y-3">
              <p>Notes (Optional)</p>
              <p class="text-gray-500">Add any helpful tips about ingredient substitutions, serving, or storage here.</p>

           <UButton
    icon="i-heroicons-pencil-square"
    size="xl"
    color="primary"
    variant="solid"
    label="Add Note"
    :trailing="false"
  />
            </div>
            <hr class="my-5">
            
            <div class=" flex flex-col ">
              
              <UFormGroup label="Make Recipe Public?">
                <UToggle color="primary" size="xl" v-model="publicRecipe" />
              </UFormGroup>
              <p>
                {{ publicRecipe }}
              </p>
              <div class="flex justify-end gap-2">
                <UButton
                
                size="xl"
                color="primary"
                variant="text"
                label="Cancel"
                
                />
                <UButton
                icon="i-heroicons-plus-circle"
                size="xl"
                color="primary"
                variant="solid"
                label="Submit Recipe"
                :trailing="false"
                />
              </div>
            </div>
            
            <hr class="my-5">
            
            <p class="text-xs italic text-gray-500"><strong>Don't Trust A Skinny Cook </strong>is all about cooks like you. If you found this recipe in a magazine, cookbook, or on a website, we can't publish it. Published recipes are subject to our <strong>Terms of Service.</strong></p>
          </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const times = ['minutes', 'hours', 'days']
const selectedTime = ref(times[0])
const publicRecipe = ref(false)
</script>

<style></style>